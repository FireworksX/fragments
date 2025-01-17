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
    if (type === FileSystemItemType.Fragment) {
      onOpenItem?.()
    }
  }

  const handleCreateNew = (type: FileSystemItemType) => {
    setCreatingNew(type)
    nextTick(() => {
      creatingRef.current.edit()
    })
  }

  const handleFinishCreateNew = (name: string) => {
    setCreatingNew(null)
    if (creatingNew === FileSystemItemType.Directory) {
      onCreateFolder?.(name)
    }
    if (creatingNew === FileSystemItemType.Fragment) {
      onCreateFragment?.(name)
    }
  }

  return (
    <>
      <div
        className={cn(styles.root, className, {
          [styles.fragment]: type === FileSystemItemType.Fragment
        })}
      >
        <SmartCell
          ref={cellRef}
          collapsed={type === FileSystemItemType.Directory ? !isOpen : false}
          selected={selected}
          isLoading={isLoading}
          icon={
            <>
              {type === FileSystemItemType.Directory && <FolderIcon />}
              {type === FileSystemItemType.Fragment && <FragmentIcon />}
            </>
          }
          onEdit={onRename}
          onToggleCollapse={onCollapse}
          onClick={handleClickCell}
        >
          {name}
        </SmartCell>
        <Dropdown
          trigger='click'
          hideOnClick
          stopPropagation
          options={
            <>
              {type === FileSystemItemType.Fragment && <ProjectTreeItemOptions type={type} onDelete={onDelete} />}
              {type === FileSystemItemType.Directory && (
                <ProjectTreeItemOptions
                  type={type}
                  onCreateFolder={() => handleCreateNew(FileSystemItemType.Directory)}
                  onCreateFragment={() => handleCreateNew(FileSystemItemType.Fragment)}
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
      </div>

      {creatingNew && (
        <SmartCell
          className={cn(styles.creatingItem, {
            [styles.fragment]: creatingNew === FileSystemItemType.Fragment
          })}
          ref={creatingRef}
          collapsed={false}
          icon={
            <>
              {creatingNew === FileSystemItemType.Directory && <FolderIcon />}
              {creatingNew === FileSystemItemType.Fragment && <FragmentIcon />}
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
