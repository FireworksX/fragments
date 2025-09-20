import React, {
  ComponentRef,
  FC,
  ForwardedRef,
  PropsWithChildren,
  ReactNode,
  useImperativeHandle,
  useRef,
  useState
} from 'react'
import { Color } from 'react-color'
import cn from 'classnames'
import styles from './styles.module.css'
import { animated, Interpolation } from '@react-spring/web'
import { Touchable } from '@/shared/ui/Touchable'
import { Button } from '@/shared/ui/Button'
import { Cell } from '@/shared/ui/Cell'
import { isValue, objectToColorString } from '@fragmentsx/utils'
import CaretRight from '@/shared/icons/next/chevrone-right.svg'
import FolderIcon from '@/shared/icons/next/folder.svg'
import FragmentIcon from '@/shared/icons/next/component.svg'
import { Spinner } from '@/shared/ui/Spinner'
import { CellProps } from 'recharts'

interface SmartCellProps extends CellProps {
  className?: string
  children: string
  collapsed?: boolean
  ref?: ForwardedRef<ComponentRef<'div'>>
  icon?: ReactNode
  after?: ReactNode
  selected?: boolean
  isLoading?: boolean
  onEdit?(value: string): void
  onCancelEdit?(): void
  onToggleCollapse?(): void
  onClick?(event): void
}

const SmartCell: FC<SmartCellProps> = ({
  className,
  children,
  selected,
  icon,
  after,
  ref,
  collapsed,
  isLoading,
  onToggleCollapse,
  onEdit,
  onCancelEdit,
  onClick,
  ...cellProps
}) => {
  const [localName, setLocalName] = useState<string | null>(null)
  const inputRef = useRef<ComponentRef<'input'>>(null)
  const isActiveEdit = isValue(localName)
  const isCollapsable = !!onToggleCollapse
  const hasCollapsedCaret = isValue(collapsed)
  const isEditable = !!onEdit

  const edit = () => {
    setLocalName(children)
    inputRef?.current?.focus()
  }

  const cancelEdit = () => {
    setLocalName(null)
    onCancelEdit?.()
  }

  const handlerEdit = () => {
    if (localName) {
      onEdit?.(localName)
    }
    setLocalName(null)
    inputRef?.current?.blur()
  }

  useImperativeHandle(ref, () => ({
    edit,
    cancelEdit
  }))

  const handleClickCell = event => {
    if (isEditable) {
      if (event?.detail > 1) {
        edit()
      }
    }
    if (isCollapsable) {
      onToggleCollapse()
    }

    onClick?.(event)
  }

  return (
    <Cell
      className={cn(className, styles.root, {
        [styles.open]: !collapsed,
        [styles.selected]: !!selected,
        [styles.hasCollapsable]: isCollapsable
      })}
      effect='none'
      {...cellProps}
      before={
        <div className={styles.before}>
          <div className={styles.beforeContent}>
            {isLoading && <Spinner className={styles.loading} color='var(--text-color-accent-secondary)' size={12} />}
            {hasCollapsedCaret && (
              <Touchable className={styles.caret} style={{ opacity: isCollapsable && !isLoading ? 1 : 0 }}>
                <CaretRight width={12} />
              </Touchable>
            )}
          </div>

          {icon && <div className={styles.icon}>{icon}</div>}
        </div>
      }
      after={after}
      onClick={handleClickCell}
    >
      <div className={styles.label}>
        <input
          className={cn(styles.labelInput, { [styles.editable]: isActiveEdit })}
          value={!isActiveEdit ? children : undefined}
          ref={inputRef}
          placeholder={localName ?? children}
          type='text'
          autoComplete='nope'
          autoCorrect='off'
          spellCheck={false}
          autoFocus={isActiveEdit}
          onBlur={cancelEdit}
          onKeyUp={e => {
            if (e.key === 'Enter') {
              handlerEdit()
            }
          }}
          onChange={e => setLocalName(e.target.value)}
        />
      </div>
    </Cell>
  )
}

export default SmartCell
