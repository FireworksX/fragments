import { FC, PropsWithChildren, useContext } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import Touchable from '@/app/components/Touchable'
import RenderDropdown, { RenderDropdownProps } from '@/app/components/RenderDropdown/RenderDropdown'
import PlusIcon from '@/app/svg/fills/plus-fill.svg'
import { LinkKey } from '@graph-state/core'
import { isVariableLink } from '@/builder/utils/isVariableLink'
import { GraphValue } from '@graph-state/react'
import { BuilderContext } from '@/builder/BuilderContext'
import ControlRowWide from '@/builder/components/ControlRow/components/ControlRowWide/ControlRowWide'
import { InputSelectVariable } from '@/app/components/InputSelectVariable/InputSelectVariable'
import { builderNodes } from '@fragments/fragments-plugin'

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
  const isVariable = isVariableLink(value)

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
                kind={variableValue._type === builderNodes.Variable ? 'variable' : 'computed'}
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
