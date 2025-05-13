'use client'
import { ComponentRef, FC, ForwardedRef, useRef, useState } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import FolderIcon from '@/shared/icons/next/folder.svg'
import FragmentIcon from '@/shared/icons/next/component.svg'
import EllipsisIcon from '@/shared/icons/next/ellipsis.svg'
import { Touchable } from '@/shared/ui/Touchable'
import { Dropdown } from '@/shared/ui/Dropdown'
import { ProjectTreeItemOptions } from '../components/ProjectTreeItemOptions'
import SmartCell from '@/shared/ui/SmartCell/ui/SmartCell'
import { projectItemType } from '../../../hooks/useProjectTree'
import { useProjectTreeItem } from '../hooks/useProjectTreeItem'

interface ProjectTreeItemProps {
  className?: string
  type: keyof typeof projectItemType
  id: number
  parentId: number
  onClick?: () => void
}

export const ProjectTreeItem: FC<ProjectTreeItemProps> = ({ className, id, parentId, type, onClick }) => {
  const projectItem = useProjectTreeItem({
    itemId: id,
    parentId,
    type,
    onClick
  })
  const hasActions = true

  return (
    <>
      <div
        className={cn(styles.root, className, {
          [styles.fragment]: type === projectItemType.fragment,
          [styles.emptyDirectory]: type === projectItemType.directory && !projectItem.hasChildren
        })}
      >
        <SmartCell
          ref={projectItem.cellRef}
          collapsed={type === projectItemType.directory ? !projectItem.isOpen : false}
          // selected={selected}
          isLoading={projectItem.isLoading}
          icon={
            <>
              {type === projectItemType.directory && (
                <FolderIcon
                  className={cn({
                    [styles.emptyDirectory]: type === projectItemType.directory && !projectItem.hasChildren
                  })}
                />
              )}
              {type === projectItemType.fragment && <FragmentIcon />}
            </>
          }
          onEdit={projectItem.rename}
          onToggleCollapse={projectItem.toggleIsOpen}
          onClick={projectItem.handleClick}
        >
          {projectItem.name}
        </SmartCell>
        {hasActions && (
          <Dropdown
            trigger='click'
            hideOnClick
            stopPropagation
            options={
              <>
                {type === projectItemType.fragment && (
                  <ProjectTreeItemOptions type={type} onRename={projectItem.edit} onDelete={projectItem.delete} />
                )}
                {type === projectItemType.directory && (
                  <ProjectTreeItemOptions
                    type={type}
                    onCreateFolder={() => projectItem.handleCreateNew(projectItemType.directory)}
                    onCreateFragment={() => projectItem.handleCreateNew(projectItemType.fragment)}
                    onRename={projectItem.edit}
                    onDelete={projectItem.delete}
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

      {projectItem.creatingNew && (
        <SmartCell
          className={cn(styles.creatingItem, {
            [styles.fragment]: projectItem.creatingNew === projectItemType.fragment
          })}
          ref={projectItem.creatingRef}
          collapsed={false}
          icon={
            <>
              {projectItem.creatingNew === projectItemType.directory && <FolderIcon />}
              {projectItem.creatingNew === projectItemType.fragment && <FragmentIcon />}
            </>
          }
          onEdit={projectItem.handleFinishCreateNew}
          onCancelEdit={projectItem.cancelCreatingNew}
        >
          {''}
        </SmartCell>
      )}
    </>
  )
}
