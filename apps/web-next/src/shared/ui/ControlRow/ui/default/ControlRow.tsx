import React, { FC, PropsWithChildren, ReactNode, useContext, useMemo } from 'react'
import cn from 'classnames'
import { LinkKey } from '@graph-state/core'
import { GraphValue } from '@graph-state/react'
import styles from './styles.module.css'
import PlusIcon from '@/shared/icons/fills/plus-fill.svg'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import ControlRowWide from '../wide/ControlRowWide'
import { DropdownRenderOption, RenderDropdown, RenderDropdownProps } from '@/shared/ui/RenderDropdown'
import { isVariableLink } from '@/shared/utils/isVariableLink'
import { isComputedValueLink } from '@/shared/utils/isComputedValueLink'
import { Touchable } from '@/shared/ui/Touchable'
import { InputSelectVariable } from '@/shared/ui/InputSelectVariable'
import { definition } from '@fragmentsx/definition'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'

export interface BuilderControlRowProps extends PropsWithChildren {
  title?: ReactNode
  className?: string
  titleWrapperClassName?: string
  actions?: RenderDropdownProps['options']
  hasConnector?: boolean
  currentValue?: unknown
  isHighlight?: boolean
  override?: {
    isOverride: boolean
    onRestOverride: () => void
  }
  variable?: {
    data?: {
      _id?: string
      _type?: keyof typeof definition.nodes
      name?: string
      type: keyof typeof definition.variableType
      mode?: keyof typeof definition.eventMode
    }
    actions: DropdownRenderOption[][]
    onReset?: () => void
    onClick?: () => void
  }
  onClickVariable?: () => unknown
}

const ControlRow: FC<BuilderControlRowProps> = ({
  className,
  titleWrapperClassName,
  title,
  hasConnector,
  isHighlight,
  override,
  children,
  actions = [],
  variable,
  onClickVariable
}) => {
  const { documentManager } = useBuilderDocument()

  const resultActions = useMemo<DropdownRenderOption[][]>(() => {
    const resultActions = []

    if (override?.isOverride) {
      resultActions.push([
        {
          name: 'resetOverride',
          label: 'Reset override',
          onClick: override?.onRestOverride
        }
      ])
    }

    if (variable?.actions) {
      resultActions.push(variable.actions)
    }

    if (actions) {
      resultActions.push(...actions)
    }

    return resultActions
  }, [actions, override?.isOverride, override?.onRestOverride, variable?.actions])

  const hasActions = resultActions.some(action => action.length > 0)
  const isHighlightResult = isHighlight || override?.isOverride

  return (
    <div className={cn(styles.root, className)}>
      <RenderDropdown
        appendTo='body'
        disabled={!hasActions}
        trigger='click'
        options={resultActions}
        hideOnClick
        placement={depth => (depth > 0 ? 'left' : undefined)}
      >
        <div
          className={cn(styles.titleWrapper, titleWrapperClassName, {
            [styles.highlight]: isHighlightResult,
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

      {variable?.data?.type ? (
        <ControlRowWide>
          <InputSelectVariable
            kind={variable.data._type === definition.nodes.Variable ? 'variable' : 'computed'}
            type={variable.data.type}
            mode={variable.data.mode}
            onClick={variable?.onClick}
            onReset={variable?.onReset}
          >
            {variable.data.name ?? variable.data._id}
          </InputSelectVariable>
        </ControlRowWide>
      ) : (
        children
      )}
    </div>
  )
}

export default ControlRow
