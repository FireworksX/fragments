import { FC, PropsWithChildren, useContext } from 'react'
import cn from 'classnames'
import { LinkKey } from '@graph-state/core'
import { GraphValue } from '@graph-state/react'
import styles from './styles.module.css'
import PlusIcon from '@/shared/icons/fills/plus-fill.svg'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import ControlRowWide from '../wide/ControlRowWide'
import { RenderDropdown, RenderDropdownProps } from '@/shared/ui/RenderDropdown'
import { isVariableLink } from '@/shared/utils/isVariableLink'
import { isComputedValueLink } from '@/shared/utils/isComputedValueLink'
import { Touchable } from '@/shared/ui/Touchable'
import { InputSelectVariable } from '@/shared/ui/InputSelectVariable'
import { nodes } from '@fragments/plugin-state'

interface BuilderControlRowProps extends PropsWithChildren {
  value?: unknown | LinkKey
  title?: string
  className?: string
  actions?: RenderDropdownProps['options']
  hasConnector?: boolean
  isHighlight?: boolean
  onResetVariable?: () => unknown
  onClickVariable?: () => unknown
}

const ControlRow: FC<BuilderControlRowProps> = ({
  className,
  value,
  title,
  hasConnector,
  isHighlight,
  children,
  actions = [],
  onResetVariable,
  onClickVariable
}) => {
  const { documentManager } = useContext(BuilderContext)
  const hasActions = actions.some(action => action.length > 0)
  const isVariable = isVariableLink(value) || isComputedValueLink(value)

  return (
    <div className={cn(styles.root, className)}>
      <RenderDropdown appendTo='body' disabled={!hasActions} trigger='click' options={actions} hideOnClick>
        <div
          className={cn(styles.titleWrapper, {
            [styles.highlight]: isHighlight,
            [styles.withAction]: hasActions
          })}
        >
          {hasConnector && (
            <Touchable className={styles.connectorIcon}>
              <PlusIcon width={10} height={10} />
            </Touchable>
          )}
          <div className={styles.title}>{title}</div>
        </div>
      </RenderDropdown>

      {isVariable ? (
        <GraphValue graphState={documentManager} field={value}>
          {variableValue => (
            <ControlRowWide>
              <InputSelectVariable
                kind={variableValue._type === nodes.Variable ? 'variable' : 'computed'}
                type={variableValue.type}
                onClick={onClickVariable}
                onReset={onResetVariable}
              >
                {variableValue.name}
              </InputSelectVariable>
            </ControlRowWide>
          )}
        </GraphValue>
      ) : (
        children
      )}
    </div>
  )
}

export default ControlRow
