import os
from uuid import uuid4

import requests

from conf.settings import logger, service_settings
from services.core.routes.schemas.client import ClientInfo
from services.core.routes.schemas.feedback import BugPost, BugPriority, ProposalPost


async def create_github_issue(issue: BugPost | ProposalPost, client_info: ClientInfo) -> str:
    attachment_links = []
    if issue.attachments:
        # Create issues subdirectory if it doesn't exist
        issues_dir = os.path.join(service_settings.MEDIA_STORAGE_PATH, 'issues')
        os.makedirs(issues_dir, exist_ok=True)
        for file in issue.attachments:
            content = await file.read()
            unique_name = f"{uuid4()}_{file.filename}"
            path = os.path.join(issues_dir, unique_name)

            try:
                with open(path, 'wb') as f:
                    f.write(content)
                logger.debug(f"Saved file to disk at: {path}")
            except Exception as e:
                logger.error(f"Failed to save file to disk: {str(e)}")
                raise RuntimeError(f"Failed to save file to disk: {str(e)}") from e

            public_path = f'{service_settings.STATIC_SERVER_URL}/issues/{unique_name}'
            attachment_links.append(f"\n![{unique_name}]({public_path})")

    url = f"https://api.github.com/repos/{service_settings.GITHUB_REPO_OWNER}/{service_settings.GITHUB_REPO_NAME}/issues"

    headers = {
        'Accept': 'application/vnd.github.v3+json',
        'Authorization': f"token {service_settings.GITHUB_ACCESS_TOKEN}",
    }

    client_info_str = (
        f"- OS type: {client_info.os_type.name if client_info.os_type else 'N/A'}\n"
        f"- Device type: {client_info.device_type.name if client_info.device_type else 'N/A'}\n"
        f"- Time: {client_info.time_frame.strftime('%Y-%m-%d %H:%M:%S') if client_info.time_frame else 'N/A'}\n"
        f"- Browser: {client_info.browser if client_info.browser else 'N/A'}\n"
        f"- Page: {issue.page}\n"
    )

    body = '## Message\n' + issue.content + '\n\n' + '## Client Info\n' + client_info_str

    if attachment_links:
        body += '\n\n' + '## Attachments\n\n' + ''.join(attachment_links)

    title = (
        issue.title
        if issue.title
        else (
            issue.content.split('.')[0][:40]
            + (
                issue.content.split('.')[0][40:].split()[0]
                if len(issue.content.split('.')[0]) > 40
                else ''
            )
            + '...'
        )
    )
    data = {
        'title': title,
        'body': body,
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
        raise RuntimeError(f"Failed to create GitHub issue: {response.text}")

    return response.json()['html_url']
