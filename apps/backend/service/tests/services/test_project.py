import os

import pytest
import strawberry

from database import Media
from services.core.routes.middleware import Context

from unittest.mock import patch, AsyncMock, MagicMock
from sqlalchemy.orm import Session

from services.core.routes.schemas.user import UserGet
from services.core.routes.user import User, AuthPayload, add_avatar_route
from services.core.routes.project import create_project_route, ProjectPost, ProjectGet, Project
from fastapi import HTTPException, UploadFile

from services.core.routes.middleware import Context
from services.dependencies import get_db

from unittest.mock import Mock
import strawberry


def mock_info():
    """
    Creates a mocked `strawberry.Info` object for unit tests.
    """
    mock_info = Mock(spec=strawberry.types.Info)

    # Mock GraphQL execution context
    mock_info.context = Mock()

    # Example: Add a mock user (if needed for authentication)
    mock_info.context.user = AsyncMock(id=123, username="test_user")

    # Example: Add a mock database session
    mock_info.context.db = Mock()

    return mock_info


@pytest.mark.asyncio
async def test_create_project_successful():
    with patch('services.core.routes.project.create_project_db', new_callable=AsyncMock) as mock_create:
        # Mocking the functions
        '''
        class Project(Base):
            __tablename__ = 'project'
            id = Column('id', Integer, primary_key=True, index=True)
            name = Column('name', String)
            logo_id = Column('logo_id', Integer, ForeignKey('media.id'))
            logo = relationship("Media")
        
            owner_id = Column('owner_id', Integer, ForeignKey('user.id'))
            owner = relationship("User")
            members = relationship("ProjectMemberRole", back_populates="project")
            campaigns = relationship("ProjectCampaign", back_populates="project")
        
            root_directory_id = Column('directory_id', Integer, ForeignKey('filesystem_directory.id'))
            root_directory = relationship(
                "FilesystemDirectory", foreign_keys=[root_directory_id]
            )
        
            # One-to-Many: Project → Multiple API Keys
            public_keys = relationship("ProjectApiKey", back_populates="project", cascade="all, delete-orphan",
                                       foreign_keys=[ProjectApiKey.project_id], primaryjoin="and_(Project.id == ProjectApiKey.project_id, ProjectApiKey.is_private == False)",)
        
            # One-to-One: Project → Private Key
            private_key_id = Column(Integer, ForeignKey('project_api_key.id', ondelete="SET NULL"), unique=True, nullable=True)
            private_key = relationship("ProjectApiKey", foreign_keys=[private_key_id], post_update=True)
        '''
        mock_create.return_value = Project(name="test")  # New user creation

        info = mock_info()
        pr: ProjectPost = ProjectPost(name="test")
        response = await create_project_route(info, pr)

        assert isinstance(response, ProjectGet)
        assert response.name == "test"
