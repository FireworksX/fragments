import { ComponentRef, FC, ForwardedRef, useRef, useState } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import FolderIcon from '@/shared/icons/next/folder.svg'
import FragmentIcon from '@/shared/icons/next/component.svg'
import EllipsisIcon from '@/shared/icons/next/ellipsis.svg'
import { Touchable } from '@/shared/ui/Touchable'
import { Dropdown } from '@/shared/ui/Dropdown'
import { ProjectTreeItemOptions } from '@/widgets/fragmentBuilder/ProjectTree/widgets/ProjectTreeItem/components/ProjectTreeItemOptions'
import SmartCell from '@/shared/ui/SmartCell/ui/SmartCell'
import { FileSystemItemType } from '@/__generated__/graphql'
import { nextTick } from '@/shared/utils/nextTick'
import { projectItemType } from '@/widgets/fragmentBuilder/ProjectTree/hooks/useProjectTree'

export type ProjectTreeItemType = 'fragment' | 'folder'

interface ProjectTreeItemProps {
  name: string
  type: FileSystemItemType
  className?: string
  isOpen?: boolean
  selected?: boolean
  isLoading?: boolean
  hasChildren?: boolean
  ref?: ForwardedRef<ComponentRef<'div'>>
  hasActions?: boolean
  onCollapse?(): void
  onRename?(name: string): void
  onCreateFolder?(): void
  onCreateFragment?(): void
  onSelectItem?(): void
  onOpenItem?(): void
  onDelete?(): void
}

let clickTimeout

export const ProjectTreeItem: FC<ProjectTreeItemProps> = ({
  ref,
  className,
  name,
  hasChildren,
  type,
  isOpen,
  isLoading,
  selected,
  hasActions = true,
  onCollapse,
  onRename,
  onCreateFolder,
  onCreateFragment,
  onSelectItem,
  onOpenItem,
  onDelete
}) => {
  const cellRef = useRef(null)
  const creatingRef = useRef(null)
  const [creatingNew, setCreatingNew] = useState<FileSystemItemType | null>(null)

  const edit = () => {
    cellRef?.current?.edit()
  }

  const handleClickCell = e => {
    if (type === projectItemType.fragment) {
      onOpenItem?.()
    }
  }

  const handleCreateNew = (type: typeof projectItemType) => {
    setCreatingNew(type)
    nextTick(() => {
      creatingRef.current.edit()
    })
  }

  const handleFinishCreateNew = (name: string) => {
    setCreatingNew(null)
    if (creatingNew === projectItemType.directory) {
      onCreateFolder?.(name)
    }
    if (creatingNew === projectItemType.fragment) {
      onCreateFragment?.(name)
    }
  }

  return (
    <>
      <div
        className={cn(styles.root, className, {
          [styles.fragment]: type === projectItemType.fragment,
          [styles.emptyDirectory]: type === projectItemType.directory && !hasChildren
        })}
      >
        <SmartCell
          ref={cellRef}
          collapsed={type === projectItemType.directory ? !isOpen : false}
          selected={selected}
          isLoading={isLoading}
          icon={
            <>
              {type === projectItemType.directory && (
                <FolderIcon
                  className={cn({ [styles.emptyDirectory]: type === projectItemType.directory && !hasChildren })}
                />
              )}
              {type === projectItemType.fragment && <FragmentIcon />}
            </>
          }
          onEdit={onRename}
          onToggleCollapse={onCollapse}
          onClick={handleClickCell}
        >
          {name}
        </SmartCell>
        {hasActions && (
          <Dropdown
            trigger='click'
            hideOnClick
            stopPropagation
            options={
              <>
                {type === projectItemType.fragment && (
                  <ProjectTreeItemOptions type={type} onRename={edit} onDelete={onDelete} />
                )}
                {type === projectItemType.directory && (
                  <ProjectTreeItemOptions
                    type={type}
                    onCreateFolder={() => handleCreateNew(projectItemType.directory)}
                    onCreateFragment={() => handleCreateNew(projectItemType.fragment)}
                    onRename={edit}
                    onDelete={onDelete}
                  />
                )}
              </>
            }
          >
            <Touchable className={styles.actions}>
              <EllipsisIcon />
            </Touchable>
          </Dropdown>
        )}
      </div>

      {creatingNew && (
        <SmartCell
          className={cn(styles.creatingItem, {
            [styles.fragment]: creatingNew === projectItemType.fragment
          })}
          ref={creatingRef}
          collapsed={false}
          icon={
            <>
              {creatingNew === projectItemType.directory && <FolderIcon />}
              {creatingNew === projectItemType.fragment && <FragmentIcon />}
            </>
          }
          onEdit={handleFinishCreateNew}
        >
          {''}
        </SmartCell>
      )}
    </>
  )
}
