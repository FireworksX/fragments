import os
from uuid import uuid4

import requests

from conf.settings import logger, service_settings
from crud.ipgetter import get_location_by_ip
from services.core.routes.schemas.client import ClientInfo
from services.core.routes.schemas.feedback import BugPost, BugPriority, ProposalPost


async def create_github_issue(issue: BugPost | ProposalPost, client_info: ClientInfo) -> str:
    attachment_links = []
    if issue.attachments:
        for file in issue.attachments:
            content = await file.read()
            unique_name = f"{uuid4()}_{file.filename}"
            path = os.path.join(service_settings.MEDIA_STORAGE_PATH, unique_name)

            try:
                with open(path, 'wb') as f:
                    f.write(content)
                logger.debug(f"Saved file to disk at: {path}")
            except Exception as e:
                logger.error(f"Failed to save file to disk: {str(e)}")
                raise e

            public_path = f'{service_settings.STATIC_SERVER_URL}/{unique_name}'
            attachment_links.append(f"\n![{file.filename}]({public_path})")

    url = f"https://api.github.com/repos/{service_settings.GITHUB_REPO_OWNER}/{service_settings.GITHUB_REPO_NAME}/issues"

    headers = {
        'Accept': 'application/vnd.github.v3+json',
        'Authorization': f"token {service_settings.GITHUB_ACCESS_TOKEN}",
    }
    location = get_location_by_ip(client_info.ip_address if client_info.ip_address else '')
    client_info_str = (
        f"Client Info:\n"
        f"os_type={client_info.os_type}\n"
        f"device_type={client_info.device_type}\n"
        f"time_frame={client_info.time_frame}\n"
        f"page={client_info.page}\n"
        f"location='city={location.city}, region={location.region}, country={location.country}'\n"
        f"browser={client_info.browser}\n"
        f"language={client_info.language}\n"
        f"screen_width={client_info.screen_width}\n"
        f"screen_height={client_info.screen_height}"
    )

    data = {
        'title': issue.title,
        'body': issue.content
        + '\n\n'
        + client_info_str
        + '\n\n'
        + 'Attachments: \n\n'
        + ''.join(attachment_links),
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

    return response.json()['html_url']
