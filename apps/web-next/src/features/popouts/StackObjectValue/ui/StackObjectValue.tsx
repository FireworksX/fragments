import React, { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { useGraph, GraphValue, GraphValues } from '@graph-state/react'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { popoutNames } from '@/shared/data'
import { useFragmentProperties } from '@/shared/hooks/fragmentBuilder/useFragmentProperties'
import { Panel } from '@/shared/ui/Panel'
import { ControlRow, ControlRowWide } from '@/shared/ui/ControlRow'
import { InstancePropertyGeneric } from '@/widgets/fragmentBuilder/BuilderFragmentInstance/ui/components/InstancePropertyGeneric'
import { undefined } from 'zod'
import { cleanGraph, omit } from '@fragmentsx/utils'
import { keyOfEntity } from '@graph-state/core'
import { useStack } from '@/shared/hooks/useStack'

export interface StackObjectValueContext {
  value?: Record<string, any>
  manager?: any
  fields?: Record<string, any>
  onChange?: (value: Record<string, any>) => void
}

interface StackObjectValueProps {
  className?: string
}

export const StackObjectValue: FC<StackObjectValueProps> = ({ className }) => {
  const { documentManager } = useBuilderDocument()
  const stack = useStack()
  const context = stack.readContext(popoutNames.stackObjectValue) ?? {}
  const resultManager = context?.manager ?? documentManager
  const inputValue = cleanGraph(context?.value ?? {})
  const fields = omit(context?.fields ?? {}, '_type', '_id')
  const onChange = context?.onChange ?? (() => undefined)

  const proxyOnChange = (key, value) => {
    const nextValue = {
      ...inputValue,
      [key]: value
    }

    onChange(nextValue)
  }

  return (
    <div className={cn(styles.root, className)}>
      <Panel>
        {Object.entries(fields).map(([key, valueLink]) => (
          <GraphValue key={key} graphState={resultManager} field={valueLink}>
            {valueGraph => (
              <>
                <InstancePropertyGeneric
                  key={key}
                  value={inputValue[valueGraph?._id]}
                  title={key}
                  property={valueLink}
                  manager={resultManager}
                  onChange={value => proxyOnChange(valueGraph?._id, value)}
                />
              </>
            )}
          </GraphValue>
        ))}
      </Panel>
    </div>
  )
}

export default StackObjectValue
