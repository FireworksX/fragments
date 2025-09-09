import base64
import mimetypes
from typing import Optional

import requests
from fastapi import UploadFile

from conf.settings import service_settings
from services.core.routes.schemas.client import ClientInfo
from services.core.routes.schemas.feedback import BugPost, BugPriority, ProposalPost


async def upload_attachment(file: UploadFile) -> str:
    content = await file.read()
    content_b64 = base64.b64encode(content).decode()

    # mime_type = mimetypes.guess_type(file.name)[0] or 'application/octet-stream'

    headers = {
        'Accept': 'application/vnd.github.v3+json',
        'Authorization': f"token {service_settings.GITHUB_ACCESS_TOKEN}",
    }

    # Upload file as a repo asset
    url = f"https://api.github.com/repos/{service_settings.GITHUB_REPO_OWNER}/{service_settings.GITHUB_REPO_NAME}/contents/uploads/{file.filename}"

    data = {'message': f"Upload attachment {file.filename}", 'content': content_b64}

    response = requests.put(url, headers=headers, json=data, timeout=10)

    if response.status_code != 201:
        raise Exception(f"Failed to upload attachment: {response.text}")

    return response.json()['content']['download_url']


async def create_github_issue(issue: BugPost | ProposalPost, client_info: ClientInfo) -> str:
    # Upload attachments first if any
    attachment_links = []
    if issue.attachments:
        for file in issue.attachments:
            download_url = await upload_attachment(file)
            attachment_links.append(f"\n![{file.filename}]({download_url})")

    url = f"https://api.github.com/repos/{service_settings.GITHUB_REPO_OWNER}/{service_settings.GITHUB_REPO_NAME}/issues"

    headers = {
        'Accept': 'application/vnd.github.v3+json',
        'Authorization': f"token {service_settings.GITHUB_ACCESS_TOKEN}",
    }

    client_info_str = f"Client Info: \n os_type={client_info.os_type} \n device_type={client_info.device_type} \n time_frame={client_info.time_frame} \n page={client_info.page} \n ip_address={client_info.ip_address} \n browser={client_info.browser} \n language={client_info.language} \n screen_width={client_info.screen_width} \n screen_height={client_info.screen_height}"

    data = {
        'title': issue.title,
        'body': issue.content + '\n\n' + client_info_str + '\n\n' + ''.join(attachment_links),
        'assignees': [service_settings.GITHUB_ASSIGNEE],
    }
    labels = []
    if isinstance(issue, BugPost):
        labels.append('bug')
        if issue.priority == BugPriority.LOW:
            labels.append('low priority')
        elif issue.priority == BugPriority.MEDIUM:
            labels.append('medium priority')
        elif issue.priority == BugPriority.HIGH:
            labels.append('high priority')
        elif issue.priority == BugPriority.CRITICAL:
            labels.append('critical priority')
        elif issue.priority == BugPriority.BLOCKING:
            labels.append('blocking priority')
    elif isinstance(issue, ProposalPost):
        labels.append('enhancement')

    data['labels'] = labels

    response = requests.post(url, headers=headers, json=data, timeout=10)

    if response.status_code != 201:
        raise Exception(f"Failed to create GitHub issue: {response.text}")

    # Return the HTML URL of the created issue
    return response.json()['html_url']
