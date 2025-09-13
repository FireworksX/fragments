import strawberry
from fastapi import HTTPException, status

from conf.settings import logger
from services.core.github.issue import create_github_issue
from services.core.telegram.bot import send_feedback

from .middleware import ClientInfo, Context
from .schemas.feedback import IssueGet, IssuePost, IssueType
from .schemas.user import AuthPayload


async def create_issue_route(info: strawberry.Info[Context], issue: IssuePost) -> IssueGet:
    logger.info('Creating new feedback')
    user: AuthPayload = await info.context.user()
    if user is None:
        logger.warning('Unauthorized attempt to create feedback')
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)

    client_info: ClientInfo = await info.context.client_info()
    fb: IssueGet = IssueGet(type=issue.type)
    if issue.type == IssueType.FEEDBACK and issue.feedback is not None:
        logger.debug('Sending feedback notification via Telegram')
        send_feedback(issue.feedback, client_info)
        logger.info('Successfully created and sent feedback')
    elif issue.type == IssueType.ISSUE and issue.bug is not None:
        fb.ticket_link = await create_github_issue(issue.bug, client_info)
    elif issue.type == IssueType.PROPOSAL and issue.proposal is not None:
        fb.ticket_link = await create_github_issue(issue.proposal, client_info)

    return fb
