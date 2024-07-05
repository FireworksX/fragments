import { ElementRef, FC, FocusEventHandler, useMemo, useRef, useState } from 'react'
import { isValue } from '@fragments/utils'
import cn from 'classnames'
import styles from './styles.module.css'
import { useTreeViewerCell } from './hooks/useTreeViewerCell'
import Touchable from '@/app/components/Touchable'
import Dropdown from '@/app/components/Dropdown/Dropdown'
import DropdownGroup from '@/app/components/Dropdown/components/DropdownGroup/DropdownGroup'
import DropdownOption from '@/app/components/Dropdown/components/DropdownOption/DropdownOption'
import CaretRight from '@/app/svg/caret-right.svg'
import { builderLayerDirection, builderNodes } from '@fragments/fragments-plugin/performance'
// import { getLayerValue } from 'src/hooks/useLayerInvoker'
import Frame from '@/app/svg/frame.svg'
import ColumnsFrame from '@/app/svg/columns-frame.svg'
import RowsFrame from '@/app/svg/rows-frame.svg'
import TextFrame from '@/app/svg/text-frame.svg'
import Component from '@/app/svg/component.svg'
import ComponentInstance from '@/app/svg/component-instance.svg'
import TreeViewerCellAside from '@/builder/TreeViewer/widgets/TreeViewerCell/components/TreeViewerCellAside/TreeViewerCellAside'
import { to } from '@react-spring/web'

export interface ViewerCellFlags {
  hasLayout: boolean
  layoutDirection: string
  hasLink: boolean
  hasEffects: boolean
  isPrimary: boolean
  isVisible: boolean
  isComponent: boolean
  isComponentInstance: boolean
  isComponentVariant: boolean
  isParentComponent: boolean
  canDuplicate: boolean
  canRemove: boolean
  canHide: boolean
  canSetPrimary: boolean
  canConvertToComponent: boolean
  canAddFrame: boolean
  canRemoveFrame: boolean
}

interface TreeViewerCellProps {
  layerKey: string
  className?: string
  collapsed?: boolean
  partialSelection?: boolean
  prevSelected?: boolean
  nextSelected?: boolean
  selected?: boolean
  toggleCollapse: (layerKey: string) => void
  handleClick: () => void
}

const TreeViewerCell: FC<TreeViewerCellProps> = ({
  className,
  layerKey,
  collapsed,
  toggleCollapse,
  handleClick,
  ...selectedProps
}) => {
  const inputRef = useRef<ElementRef<'input'>>(null)
  const [editLabel, setEditLabel] = useState<string | undefined>()
  const isActiveEdit = isValue(editLabel)

  const {
    // label,
    type,
    name,
    // children,
    flags,
    min,
    max,
    duplicate,
    remove,
    toggleVisible,
    setPrimary,
    click,
    // rename,
    // setPrimary,
    // toggleVisible,
    // buildFullKey,
    // convertToComponent,
    wrapFrame,
    removeWrapper,
    rename
  } = useTreeViewerCell(layerKey)
  // const isOpen = layerKey in openMap ? openMap[layerKey] : false

  const TypeIcon = useMemo(() => {
    if (flags.isComponentInstance) return <ComponentInstance className={styles.componentIcon} />
    if (flags.isComponent) return <Component className={styles.componentIcon} />

    if (type === builderNodes.Text) return <TextFrame className={styles.textIcon} />

    if (flags.hasLayout) {
      return flags.layoutDirection === builderLayerDirection.horizontal ? (
        <ColumnsFrame className={styles.primaryIcon} />
      ) : (
        <RowsFrame className={styles.primaryIcon} />
      )
    }

    return <Frame className={styles.primaryIcon} />
  }, [flags, type])

  const onEdit = () => {
    if (editLabel) {
      rename(editLabel)
      setEditLabel(undefined)
      inputRef?.current?.blur()
    }
  }

  const asideProps = {
    ...flags,
    min,
    max
  }

  const classNames = useMemo(() => {
    let background = ''
    let radius: string[] = []
    const states = []

    if (!selectedProps.prevSelected && selectedProps.nextSelected) {
      background = flags.isPartialComponent && selectedProps.selected ? styles.selectedComponent : styles.selected
      radius = [styles.borderTop]
    }

    if (selectedProps.prevSelected && !selectedProps.nextSelected) {
      background = flags.isPartialComponent ? styles.partialSelectedComponent : styles.partialSelected
      radius = [styles.borderBottom]
    }

    if (selectedProps.prevSelected) {
      background = flags.isPartialComponent ? styles.partialSelectedComponent : styles.partialSelected
    }

    if (!selectedProps.prevSelected && !selectedProps.nextSelected && selectedProps.partialSelection) {
      background = flags.isPartialComponent && selectedProps.selected ? styles.selectedComponent : styles.selected
      radius = [styles.borderTop, styles.borderBottom]
    }

    if (!flags.hasChildren && !selectedProps.selected) {
      states.push(selectedProps.partialSelection ? styles.emptyPartial : styles.empty)
    }

    return [background, radius, states]
  }, [flags, selectedProps])

  return (
    <Dropdown
      trigger='rightClick'
      placement='bottom'
      appendTo='body'
      options={
        <>
          <DropdownGroup minWidth={200}>
            <DropdownOption description='⌘;' disabled={!flags.canHide} onClick={toggleVisible}>
              {to(flags.hidden, v => (v ? 'Show' : 'Hide'))}
            </DropdownOption>
            <DropdownOption description='⌘D' disabled={!flags.canDuplicate} onClick={duplicate}>
              Duplicate
            </DropdownOption>
            <DropdownOption description='⌫' disabled={!flags.canRemove} onClick={remove}>
              Remove
            </DropdownOption>
            <DropdownOption disabled={!flags.canSetPrimary} onClick={setPrimary}>
              Set Primary
            </DropdownOption>
            {/*<DropdownOption description='⌘K' disabled={!flags.canConvertToComponent} onClick={convertToComponent}>*/}
            {/*  To Component*/}
            {/*</DropdownOption>*/}
          </DropdownGroup>
          <DropdownGroup>
            <DropdownOption disabled={!flags.canAddFrame} onClick={wrapFrame}>
              Wrap Frame
            </DropdownOption>
            <DropdownOption disabled={!flags.canRemoveWrapper} onClick={removeWrapper}>
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
        onClick={handleClick}
      >
        <Touchable
          className={cn(styles.collapse, { [styles.open]: !collapsed })}
          onClick={() => toggleCollapse(layerKey)}
        >
          {flags.hasChildren && <CaretRight className={styles.titleCaret} width={10} collapsed={collapsed} />}
        </Touchable>
        <div className={styles.headIcon}>{TypeIcon}</div>
        <div
          className={styles.label}
          onDoubleClick={() => {
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
        <TreeViewerCellAside className={styles.actions} type={type} {...asideProps} />
      </div>
    </Dropdown>
  )
}

export default TreeViewerCell
