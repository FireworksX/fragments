import { ElementRef, FC, useEffect, useMemo, useRef, useState } from 'react'
import cn from 'classnames'
import { LinkKey } from '@graph-state/core'
import { isValue } from '@fragments/utils'
import { to } from '@react-spring/web'
import styles from './styles.module.css'
import CaretRight from '@/shared/icons/next/chevrone-right.svg'
import { useBuilderLayerCell } from '../hooks/useBuilderLayerCell'
import { BuilderLayerTypeIcon } from './BuilderLayerTypeIcon'
import { Dropdown } from '@/shared/ui/Dropdown'
import { DropdownGroup } from '@/shared/ui/DropdownGroup'
import { DropdownOption } from '@/shared/ui/DropdownOption'
import { Touchable } from '@/shared/ui/Touchable'
import { useBuilderLayerFlags } from '@/shared/hooks/fragmentBuilder/useBuilderLayerFlags'

interface BuilderLayerCellProps {
  layerKey: LinkKey
  collapsed?: boolean
  className?: string
  isLast?: boolean
  onCollapse?: () => void
}

export const BuilderLayerCell: FC<BuilderLayerCellProps> = ({ className, isLast, layerKey, collapsed, onCollapse }) => {
  const inputRef = useRef<ElementRef<'input'>>(null)
  const [editLabel, setEditLabel] = useState<string | undefined>()
  const isActiveEdit = isValue(editLabel)

  const { type, name, isFragment, hasChildren, partialSelected, handleSelect, selected, rename } =
    useBuilderLayerCell(layerKey)
  const flags = useBuilderLayerFlags(layerKey)

  // const {
  //   // label,
  //   type,
  //   name,
  //   // children,
  //   flags,
  //   min,
  //   max,
  //   duplicate,
  //   remove,
  //   toggleVisible,
  //   setPrimary,
  //   click,
  //   // rename,
  //   // setPrimary,
  //   // toggleVisible,
  //   // buildFullKey,
  //   // convertToComponent,
  //   wrapFrame,
  //   removeWrapper,
  //   rename
  // } = useTreeViewerCell(layerKey)
  // const isOpen = layerKey in openMap ? openMap[layerKey] : false

  const onEdit = () => {
    if (editLabel) {
      rename(editLabel)
    }

    setEditLabel(undefined)
    inputRef?.current?.blur()
  }

  const asideProps = {
    // ...flags,
    // min,
    // max
  }

  const classNames = useMemo(() => {
    const background = []
    const radius: string[] = []
    const states = []

    if (selected) {
      background.push(styles.selected)
      radius.push(styles.borderTop)
      if (collapsed || !hasChildren) {
        background.push(styles.borderBottom)
      }
    } else if (partialSelected) {
      background.push(styles.partialSelected)
    }

    if (isLast) {
      radius.push(styles.borderBottom)
    }
    if (!hasChildren && !selected) {
      states.push(partialSelected ? styles.emptyPartial : styles.empty)
    }

    if (isFragment) {
      states.push(selected ? styles.selectedFragment : styles.fragment)
    }

    return [background, radius, states]
  }, [collapsed, hasChildren, isFragment, isLast, partialSelected, selected])

  return (
    <Dropdown
      trigger='rightClick'
      placement='bottom'
      appendTo='body'
      options={
        <>
          <DropdownGroup minWidth={200}>
            <DropdownOption description='⌘;' disabled={!flags.isVisible$} onClick={flags.toggleVisible}>
              {to(flags.isVisible$, v => (!v ? 'Show' : 'Hide'))}
            </DropdownOption>
            {/*  <DropdownOption description='⌘D' disabled={!flags.canDuplicate} onClick={duplicate}>*/}
            {/*    Duplicate*/}
            {/*  </DropdownOption>*/}
            <DropdownOption description='⌫' disabled={!flags.canRemove} onClick={flags.remove}>
              Remove
            </DropdownOption>
            {/*  <DropdownOption disabled={!flags.canSetPrimary} onClick={setPrimary}>*/}
            {/*    Set Primary*/}
            {/*  </DropdownOption>*/}
            {/*  /!*<DropdownOption description='⌘K' disabled={!flags.canConvertToComponent} onClick={convertToComponent}>*!/*/}
            {/*  /!*  To Component*!/*/}
            {/*  /!*</DropdownOption>*!/*/}
            {/*</DropdownGroup>*/}
            {/*<DropdownGroup>*/}
            <DropdownOption description='⌘↵' disabled={!flags.canWrap} onClick={flags.wrapFrame}>
              Wrap Frame
            </DropdownOption>
            <DropdownOption description='⌘⌫' disabled={!flags.canRemoveWrapper} onClick={flags.removeWrapper}>
              Remove Frame
            </DropdownOption>
          </DropdownGroup>
        </>
      }
    >
      <div
        className={cn(
          styles.root,
          className,
          {
            [styles.open]: !collapsed
          },
          classNames
        )}
        onClick={handleSelect}
      >
        <Touchable
          className={cn(styles.collapse, { [styles.open]: !collapsed })}
          onClick={e => {
            e.stopPropagation()
            onCollapse()
          }}
        >
          {hasChildren && <CaretRight className={styles.titleCaret} width={10} collapsed={collapsed} />}
        </Touchable>
        <div className={styles.headIcon}>
          <BuilderLayerTypeIcon
            type={type}
            layoutDirection={flags.layerDirection$}
            hasLayout={flags.hasLayout$}
            primaryIconClassName={styles.primaryIcon}
            textIconClassName={styles.textIcon}
            fragmentIconClassName={styles.fragmentIcon}
          />
        </div>
        <div
          className={styles.label}
          onDoubleClick={e => {
            e.preventDefault()
            e.stopPropagation()
            inputRef?.current?.focus()
            setEditLabel('')
          }}
        >
          <input
            className={cn(styles.labelInput, { [styles.editable]: isActiveEdit })}
            value={!isActiveEdit ? name : undefined}
            ref={inputRef}
            placeholder={editLabel}
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
            onChange={e => setEditLabel(e.target.value)}
          />
        </div>
      </div>
    </Dropdown>
  )
}
