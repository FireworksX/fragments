import { ComponentRef, FC, ForwardedRef, useImperativeHandle, useRef, useState } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import FolderIcon from '@/shared/icons/next/folder.svg'
import FragmentIcon from '@/shared/icons/next/component.svg'
import CaretRight from '@/shared/icons/next/chevrone-right.svg'
import EllipsisIcon from '@/shared/icons/next/ellipsis.svg'
import { Cell } from '@/shared/ui/Cell'
import { Touchable } from '@/shared/ui/Touchable'
import { Dropdown } from '@/shared/ui/Dropdown'
import { DropdownGroup } from '@/shared/ui/DropdownGroup'
import { DropdownOption } from '@/shared/ui/DropdownOption'
import { isValue } from '@fragments/utils'
import { ProjectTreeItemOptions } from '@/widgets/fragmentBuilder/ProjectTree/widgets/ProjectTreeItem/components/ProjectTreeItemOptions'
import SmartCell from '@/shared/ui/SmartCell/ui/SmartCell'

export type ProjectTreeItemType = 'fragment' | 'folder'

interface ProjectTreeItemProps {
  name: string
  type: ProjectTreeItemType
  className?: string
  isOpen?: boolean
  selected?: boolean
  hasChildren?: boolean
  ref?: ForwardedRef<ComponentRef<'div'>>
  onCollapse?(): void
  onRename?(name: string): void
  onCreateFolder?(): void
  onCreateFragment?(): void
  onSelectItem?(): void
  onOpenItem?(): void
}

let clickTimeout

export const ProjectTreeItem: FC<ProjectTreeItemProps> = ({
  ref,
  className,
  name,
  hasChildren,
  type,
  isOpen,
  selected,
  onCollapse,
  onRename,
  onCreateFolder,
  onCreateFragment,
  onSelectItem,
  onOpenItem
}) => {
  const handleClickCell = e => {
    if (type === 'fragment') {
      onOpenItem?.()
    }
  }

  return (
    <div
      className={cn(styles.root, className, {
        [styles.fragment]: type === 'fragment'
      })}
    >
      <SmartCell
        ref={ref}
        collapsed={type === 'folder' ? !isOpen : undefined}
        selected={selected}
        icon={
          <>
            {type === 'folder' && <FolderIcon />}
            {type === 'fragment' && <FragmentIcon />}
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
            {type === 'fragment' && <ProjectTreeItemOptions type={type} />}
            {type === 'folder' && (
              <ProjectTreeItemOptions type={type} onCreateFolder={onCreateFolder} onCreateFragment={onCreateFragment} />
            )}
          </>
        }
      >
        <Touchable className={styles.actions}>
          <EllipsisIcon />
        </Touchable>
      </Dropdown>
    </div>
  )
}
