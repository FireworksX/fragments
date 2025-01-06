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
  onSelectFile?(): void
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
  onSelectFile
}) => {
  const [localName, setLocalName] = useState<string | null>(null)
  const inputRef = useRef<ComponentRef<'input'>>(null)
  const isActiveEdit = isValue(localName)

  const onEdit = () => {
    if (localName) {
      onRename?.(localName)
    }
    setLocalName(null)
    inputRef?.current?.blur()
  }

  const handleRename = e => {
    // e?.preventDefault()
    // e?.stopPropagation()
    inputRef?.current?.focus()
    setLocalName('')
  }

  useImperativeHandle(ref, () => ({
    handleRename
  }))

  const handleClickCell = () => {
    if (type === 'folder') {
      onCollapse?.()
    }
    if (type === 'fragment') {
      onSelectFile?.()
    }
  }

  return (
    <Cell
      effect='none'
      className={cn(styles.root, className, {
        [styles.fragment]: type === 'fragment',
        [styles.open]: isOpen,
        [styles.selected]: selected
      })}
      before={
        <div className={styles.before}>
          <Touchable className={styles.caret} style={{ opacity: hasChildren ? 1 : 0 }}>
            <CaretRight width={10} />
          </Touchable>
          <div className={styles.icon}>
            {type === 'folder' && <FolderIcon />}
            {type === 'fragment' && <FragmentIcon />}
          </div>
        </div>
      }
      after={
        <Dropdown
          trigger='click'
          hideOnClick
          stopPropagation
          options={
            <>
              <DropdownGroup>
                <DropdownOption onClick={onCreateFolder}>New Folder</DropdownOption>
                <DropdownOption onClick={onCreateFragment}>New Fragment</DropdownOption>
              </DropdownGroup>
              <DropdownGroup>
                <DropdownOption onClick={handleRename}>Rename</DropdownOption>
                <DropdownOption mode='danger'>Delete</DropdownOption>
              </DropdownGroup>
            </>
          }
        >
          <Touchable className={styles.actions}>
            <EllipsisIcon />
          </Touchable>
        </Dropdown>
      }
      onClick={handleClickCell}
    >
      <div className={styles.label} onDoubleClick={handleRename}>
        <input
          className={cn(styles.labelInput, { [styles.editable]: isActiveEdit })}
          value={!isActiveEdit ? name : undefined}
          ref={inputRef}
          placeholder={localName}
          type='text'
          autoComplete='nope'
          autoCorrect='off'
          spellCheck={false}
          autoFocus={isActiveEdit}
          onBlur={onEdit}
          onKeyUp={e => {
            if (e.key === 'Enter') {
              onEdit()
            }
          }}
          onChange={e => setLocalName(e.target.value)}
        />
      </div>
    </Cell>
  )
}
