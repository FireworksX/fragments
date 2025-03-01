import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { DropdownGroup } from '@/shared/ui/DropdownGroup'
import { DropdownOption } from '@/shared/ui/DropdownOption'
import { FileSystemItemType } from '@/__generated__/graphql'
import { projectItemType } from '@/widgets/fragmentBuilder/ProjectTree/hooks/useProjectTree'

interface FragmentOptions {
  type: 'fragment'
  onInsert?(): void
  onRename?(): void
  onDelete?(): void
}

interface FolderOptions {
  type: FileSystemItemType
  onCreateFolder?(): void
  onCreateFragment?(): void
  onRename?(): void
  onDelete?(): void
}

type ProjectTreeItemOptionsProps = FragmentOptions | FolderOptions

export const ProjectTreeItemOptions: FC<ProjectTreeItemOptionsProps> = props => {
  if (props.type === projectItemType.fragment) {
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

  if (props.type === projectItemType.directory) {
    return (
      <>
        <DropdownGroup>
          <DropdownOption onClick={props.onCreateFolder}>New Folder</DropdownOption>
          <DropdownOption onClick={props.onCreateFragment}>New Fragment</DropdownOption>
        </DropdownGroup>
        <DropdownGroup>
          {props.onRename && <DropdownOption onClick={props.onRename}>Rename</DropdownOption>}
          {props.onDelete && (
            <DropdownOption mode='danger' onClick={props.onDelete}>
              Delete
            </DropdownOption>
          )}
        </DropdownGroup>
      </>
    )
  }

  return null
}
