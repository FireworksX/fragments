import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { DropdownGroup } from '@/shared/ui/DropdownGroup'
import { DropdownOption } from '@/shared/ui/DropdownOption'

interface FragmentOptions {
  type: 'fragment'
  onInsert?(): void
  onRename?(): void
  onDelete?(): void
}

interface FolderOptions {
  type: 'folder'
  onCreateFolder?(): void
  onCreateFragment?(): void
  onRename?(): void
  onDelete?(): void
}

type ProjectTreeItemOptionsProps = FragmentOptions | FolderOptions

export const ProjectTreeItemOptions: FC<ProjectTreeItemOptionsProps> = props => {
  if (props.type === 'fragment') {
    return (
      <>
        <DropdownGroup>
          <DropdownOption onClick={props.onInsert}>Insert</DropdownOption>
        </DropdownGroup>
        <DropdownGroup>
          <DropdownOption onClick={props.onRename}>Rename</DropdownOption>
          <DropdownOption mode='danger' onClick={props.onDelete}>
            Delete
          </DropdownOption>
        </DropdownGroup>
      </>
    )
  }

  if (props.type === 'folder') {
    return (
      <>
        <DropdownGroup>
          <DropdownOption onClick={props.onCreateFolder}>New Folder</DropdownOption>
          <DropdownOption onClick={props.onCreateFragment}>New Fragment</DropdownOption>
        </DropdownGroup>
        <DropdownGroup>
          <DropdownOption onClick={props.onRename}>Rename</DropdownOption>
          <DropdownOption mode='danger' onClick={props.onDelete}>
            Delete
          </DropdownOption>
        </DropdownGroup>
      </>
    )
  }

  return null
}
