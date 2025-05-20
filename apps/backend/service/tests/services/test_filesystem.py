from unittest.mock import AsyncMock, Mock, patch

import pytest
from fastapi import HTTPException

from database import FilesystemDirectory, Project
from services.core.routes.filesystem import (
    create_directory_route,
    delete_directory_route,
    get_directory,
    update_directory_route,
)
from services.core.routes.schemas.filesystem import (
    ProjectDirectory,
    ProjectDirectoryGet,
    ProjectDirectoryPatch,
)
from services.core.routes.schemas.user import RoleGet


def mock_info():
    info = Mock()
    info.context = Mock()
    info.context.user = AsyncMock(return_value=Mock(user=Mock(id=123)))
    info.context.session = Mock(return_value=Mock())
    return info


@pytest.mark.asyncio
async def test_create_directory_successful():
    with patch(
        'services.core.routes.filesystem.get_project_by_id_db', new_callable=AsyncMock
    ) as mock_get_project, patch(
        'services.core.routes.filesystem.write_permission', new_callable=AsyncMock
    ) as mock_permission, patch(
        'services.core.routes.filesystem.create_directory_db', new_callable=AsyncMock
    ) as mock_create_dir:

        mock_project = Mock(spec=Project)
        mock_get_project.return_value = mock_project
        mock_permission.return_value = True

        mock_dir = Mock(spec=FilesystemDirectory)
        mock_dir.id = 1
        mock_dir.name = 'test_dir'
        mock_dir.parent_id = None
        mock_dir.project_id = 1
        mock_dir.fragments = []
        mock_dir.subdirectories = []
        mock_create_dir.return_value = mock_dir

        info = mock_info()
        directory = ProjectDirectory(name='test_dir', parent_id=None, project_id=1)

        response = await create_directory_route(info, directory)

        assert isinstance(response, list)
        assert len(response) == 1
        assert isinstance(response[0], ProjectDirectoryGet)
        assert response[0].name == 'test_dir'


@pytest.mark.asyncio
async def test_create_directory_project_not_found():
    with patch(
        'services.core.routes.filesystem.get_project_by_id_db', new_callable=AsyncMock
    ) as mock_get_project:

        mock_get_project.return_value = None

        info = mock_info()
        directory = ProjectDirectory(name='test_dir', parent_id=None, project_id=1)

        with pytest.raises(HTTPException) as exc:
            await create_directory_route(info, directory)

        assert exc.value.status_code == 404


@pytest.mark.asyncio
async def test_get_directory_successful():
    with patch(
        'services.core.routes.filesystem.get_directory_by_id_db', new_callable=AsyncMock
    ) as mock_get_dir, patch(
        'services.core.routes.filesystem.get_project_by_id_db', new_callable=AsyncMock
    ) as mock_get_project, patch(
        'services.core.routes.filesystem.write_permission', new_callable=AsyncMock
    ) as mock_permission:

        mock_dir = Mock(spec=FilesystemDirectory)
        mock_dir.id = 1
        mock_dir.name = 'test_dir'
        mock_dir.parent_id = None
        mock_dir.project_id = 1
        mock_dir.fragments = []
        mock_dir.subdirectories = []
        mock_get_dir.return_value = mock_dir

        mock_project = Mock(spec=Project)
        mock_get_project.return_value = mock_project
        mock_permission.return_value = True

        info = mock_info()
        response = await get_directory(info, 1)

        assert isinstance(response, list)
        assert len(response) == 1
        assert isinstance(response[0], ProjectDirectoryGet)
        assert response[0].name == 'test_dir'


@pytest.mark.asyncio
async def test_delete_directory_successful():
    with patch(
        'services.core.routes.filesystem.get_directory_by_id_db', new_callable=AsyncMock
    ) as mock_get_dir, patch(
        'services.core.routes.filesystem.get_project_by_id_db', new_callable=AsyncMock
    ) as mock_get_project, patch(
        'services.core.routes.filesystem.write_permission', new_callable=AsyncMock
    ) as mock_permission, patch(
        'services.core.routes.filesystem.delete_directory_db', new_callable=AsyncMock
    ) as mock_delete:

        mock_dir = Mock(spec=FilesystemDirectory)
        mock_dir.id = 1
        mock_dir.project_id = 1
        mock_get_dir.return_value = mock_dir

        mock_project = Mock(spec=Project)
        mock_project.root_directory_id = 2  # Different from directory being deleted
        mock_get_project.return_value = mock_project
        mock_permission.return_value = True

        info = mock_info()
        await delete_directory_route(info, 1)

        mock_delete.assert_called_once_with(info.context.session(), 1)


@pytest.mark.asyncio
async def test_update_directory_successful():
    with patch(
        'services.core.routes.filesystem.get_directory_by_id_db', new_callable=AsyncMock
    ) as mock_get_dir, patch(
        'services.core.routes.filesystem.get_project_by_id_db', new_callable=AsyncMock
    ) as mock_get_project, patch(
        'services.core.routes.filesystem.write_permission', new_callable=AsyncMock
    ) as mock_permission, patch(
        'services.core.routes.filesystem.update_directory_db', new_callable=AsyncMock
    ) as mock_update:

        mock_dir = Mock(spec=FilesystemDirectory)
        mock_dir.id = 1
        mock_dir.name = 'updated_dir'
        mock_dir.parent_id = None
        mock_dir.project_id = 1
        mock_dir.fragments = []
        mock_dir.subdirectories = []
        mock_get_dir.return_value = mock_dir
        mock_update.return_value = mock_dir

        mock_project = Mock(spec=Project)
        mock_get_project.return_value = mock_project
        mock_permission.return_value = True

        info = mock_info()
        directory = ProjectDirectoryPatch(id=1, name='updated_dir')

        response = await update_directory_route(info, directory)

        assert isinstance(response, list)
        assert len(response) == 1
        assert isinstance(response[0], ProjectDirectoryGet)
        assert response[0].name == 'updated_dir'
