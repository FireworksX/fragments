import { ComponentRef, ElementRef, FC, useEffect, useMemo, useRef, useState } from 'react'
import cn from 'classnames'
import { LinkKey } from '@graph-state/core'
import { isValue } from '@fragmentsx/utils'
import { animated } from '@react-spring/web'
import styles from './styles.module.css'
import CaretRight from '@/shared/icons/next/chevrone-right.svg'
import { useBuilderLayerCell } from '../hooks/useBuilderLayerCell'
import { BuilderLayerTypeIcon } from './BuilderLayerTypeIcon'
import { Dropdown } from '@/shared/ui/Dropdown'
import { DropdownGroup } from '@/shared/ui/DropdownGroup'
import { DropdownOption } from '@/shared/ui/DropdownOption'
import { Touchable } from '@/shared/ui/Touchable'
import { useBuilderLayerFlags } from '@/shared/hooks/fragmentBuilder/useBuilderLayerFlags'
import { useInterpolation } from '@/shared/hooks/useInterpolation'
import { useShortcut } from '@/shared/hooks/useShortcut'
import { SHORTCUTS } from '@/shared/constants/shortcuts'

interface BuilderLayerCellProps {
  layerKey: LinkKey
  collapsed?: boolean
  className?: string
  isLast?: boolean
  onCollapse?: () => void
}

export const BuilderLayerCell: FC<BuilderLayerCellProps> = ({ className, isLast, layerKey, collapsed, onCollapse }) => {
  const inputRef = useRef<ComponentRef<'input'>>(null)
  const [editLabel, setEditLabel] = useState<string | undefined>()
  const isActiveEdit = isValue(editLabel)

  const {
    name,
    breakpointThreshold,
    isPrimaryLayer,
    isInstance,
    hasChildren,
    partialSelected,
    partialHidden,
    handleSelect,
    selected,
    rename
  } = useBuilderLayerCell(layerKey)
  const flags = useBuilderLayerFlags(layerKey)
  const shortcuts = useShortcut()
  const hidden = !flags.isVisible || partialHidden

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

    if (isInstance) {
      states.push(selected ? styles.selectedFragment : styles.fragment)
    }

    if (hidden) {
      states.push(styles.hidden)
    }

    return [background, radius, states]
  }, [collapsed, hasChildren, isInstance, isLast, partialSelected, selected, hidden])

  return (
    <Dropdown
      trigger='rightClick'
      placement='bottom'
      appendTo='body'
      options={
        <>
          <DropdownGroup minWidth={200}>
            <DropdownOption description={shortcuts[SHORTCUTS.toggleVisible]} onClick={flags.toggleVisible}>
              {!flags.isVisible ? 'Show' : 'Hide'}
            </DropdownOption>
            <DropdownOption
              description={shortcuts[SHORTCUTS.duplicate]}
              disabled={!flags.canDuplicate}
              onClick={flags.duplicate}
            >
              Duplicate
            </DropdownOption>
            <DropdownOption
              description={shortcuts[SHORTCUTS.remove]}
              disabled={!flags.canRemove}
              onClick={flags.remove}
            >
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
            <DropdownOption
              description={shortcuts[SHORTCUTS.wrapFrame]}
              disabled={!flags.canWrap}
              onClick={flags.wrapFrame}
            >
              Wrap Frame
            </DropdownOption>
            <DropdownOption
              description={shortcuts[SHORTCUTS.removeFrame]}
              disabled={!flags.canRemoveWrapper}
              onClick={flags.removeWrapper}
            >
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
          {hasChildren && <CaretRight className={styles.titleCaret} width={10} />}
        </Touchable>
        <div className={styles.headIcon}>
          <BuilderLayerTypeIcon
            flags={flags}
            hasLayout={flags.hasLayout}
            layoutDirection={flags.layerDirection}
            layerKey={layerKey}
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
        <div className={styles.actions}>
          {isPrimaryLayer && 'Primary'} {breakpointThreshold}
        </div>
      </div>
    </Dropdown>
  )
}
