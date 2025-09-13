from enum import Enum
from typing import List, Optional

import strawberry
from fastapi import UploadFile


@strawberry.enum
class FeelLevel(Enum):
    ONE = 1
    TWO = 2
    THREE = 3
    FOUR = 4
    FIVE = 5


@strawberry.enum
class IssueType(Enum):
    FEEDBACK = 1
    ISSUE = 2
    PROPOSAL = 3


@strawberry.enum
class BugPriority(Enum):
    LOW = 1
    MEDIUM = 2
    HIGH = 3
    CRITICAL = 4
    BLOCKING = 5


@strawberry.input
class IssueBase:
    page: str
    content: str
    attachments: Optional[List[UploadFile]] = None


@strawberry.input
class FeedbackPost(IssueBase):
    feel: FeelLevel


@strawberry.input
class ProposalPost(IssueBase):
    title: Optional[str] = None


@strawberry.input
class BugPost(IssueBase):
    title: Optional[str] = None
    priority: BugPriority


@strawberry.input
class IssuePost:
    type: IssueType
    bug: Optional[BugPost] = None
    proposal: Optional[ProposalPost] = None
    feedback: Optional[FeedbackPost] = None


@strawberry.type
class IssueGet:
    type: IssueType
    ticket_link: Optional[str] = None
