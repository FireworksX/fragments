import pytest
from unittest.mock import Mock

from crud.filesystem import (
    create_directory_db,
    get_directory_by_id_db,
    update_directory_db,
    delete_directory_db
)
from database.models import FilesystemDirectory, Fragment


@pytest.fixture
def mock_session():
    session = Mock()
    session.add = Mock()
    session.commit = Mock()
    session.refresh = Mock()
    session.query = Mock()
    return session


@pytest.mark.asyncio
async def test_create_directory(mock_session):
    parent_id = 1
    name = "test_dir"
    project_id = 1
    
    mock_directory = FilesystemDirectory(
        parent_id=parent_id,
        name=name,
        project_id=project_id
    )
    mock_session.refresh.side_effect = lambda x: None
    
    created_directory = await create_directory_db(mock_session, parent_id, name, project_id)
    
    assert isinstance(created_directory, FilesystemDirectory)
    assert created_directory.parent_id == parent_id
    assert created_directory.name == name
    assert created_directory.project_id == project_id
    assert mock_session.add.call_count == 1
    assert mock_session.commit.call_count == 1
    assert mock_session.refresh.call_count == 1


@pytest.mark.asyncio
async def test_get_directory_by_id(mock_session):
    directory_id = 1
    mock_directory = FilesystemDirectory(id=directory_id)
    
    mock_query = Mock()
    mock_filter = Mock()
    mock_session.query.return_value = mock_query
    mock_query.filter.return_value = mock_filter
    mock_filter.first.return_value = mock_directory
    
    directory = await get_directory_by_id_db(mock_session, directory_id)
    assert directory == mock_directory


@pytest.mark.asyncio
async def test_update_directory(mock_session):
    directory_id = 1
    new_name = "updated_dir"
    new_parent_id = 2
    
    mock_directory = FilesystemDirectory(id=directory_id)
    
    mock_query = Mock()
    mock_filter = Mock()
    mock_session.query.return_value = mock_query
    mock_query.filter.return_value = mock_filter
    mock_filter.first.return_value = mock_directory

    values = {
        'id': directory_id,
        'name': new_name,
        'parent_id': new_parent_id
    }
    
    updated_directory = await update_directory_db(mock_session, values)
    
    assert updated_directory == mock_directory
    assert updated_directory.name == new_name
    assert updated_directory.parent_id == new_parent_id
    assert mock_session.commit.call_count == 1
    assert mock_session.refresh.call_count == 1


# @pytest.mark.asyncio
# async def test_delete_directory_empty(mock_session):
#     directory_id = 1
#     mock_directory = FilesystemDirectory(id=directory_id)
#     mock_directory.fragments = []
    
#     mock_session.query.get.return_value = mock_directory
    
#     await delete_directory_db(mock_session, directory_id)
    
#     assert mock_session.delete.call_count == 1
#     assert mock_session.commit.call_count == 1


# @pytest.mark.asyncio
# async def test_delete_directory_with_unreferenced_fragments(mock_session):
#     directory_id = 1
#     mock_directory = FilesystemDirectory(id=directory_id)
#     mock_fragments = [Fragment(id=1), Fragment(id=2)]
#     mock_directory.fragments = mock_fragments
    
#     mock_session.query.get.return_value = mock_directory
    
#     mock_query = Mock()
#     mock_filter = Mock()
#     mock_session.query.return_value = mock_query
#     mock_query.filter.return_value = mock_filter
#     mock_filter.filter.return_value = mock_filter
#     mock_filter.all.return_value = []

#     await delete_directory_db(mock_session, directory_id)
    
#     assert mock_session.delete.call_count == 1
#     assert mock_session.commit.call_count == 1


# @pytest.mark.asyncio
# async def test_delete_directory_with_referenced_fragments(mock_session):
#     directory_id = 1
#     mock_directory = FilesystemDirectory(id=directory_id)
#     mock_fragments = [Fragment(id=1, name="frag1"), Fragment(id=2, name="frag2")]
#     mock_directory.fragments = mock_fragments

#     # Mock the get() call to return the directory
#     mock_session.query.return_value.get.return_value = mock_directory

#     # Mock the query chain for checking referencing fragments
#     mock_query = Mock()
#     mock_filter1 = Mock()
#     mock_filter2 = Mock()
#     mock_session.query.return_value = mock_query
#     mock_query.filter.return_value = mock_filter1
#     mock_filter1.filter.return_value = mock_filter2
#     mock_filter2.all.return_value = [Fragment(id=3, name="referencing_frag")]

#     with pytest.raises(ValueError):
#         await delete_directory_db(mock_session, directory_id)


@pytest.mark.asyncio
async def test_delete_directory_not_found(mock_session):
    directory_id = 999
    mock_query = Mock()
    mock_session.query.return_value = mock_query
    mock_query.get.return_value = None

    with pytest.raises(ValueError):
        await delete_directory_db(mock_session, directory_id)
