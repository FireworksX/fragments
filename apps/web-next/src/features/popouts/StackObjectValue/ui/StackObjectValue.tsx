import React, { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { POPOUT_TYPE, popoutsStore } from '@/shared/store/popouts.store'
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

interface StackObjectValueProps {
  className?: string
}

export const StackObjectValue: FC<StackObjectValueProps> = ({ className }) => {
  const { documentManager } = useBuilderDocument()
  const [popout] = useGraph(popoutsStore, `${POPOUT_TYPE}:${popoutNames.stackObjectValue}`)
  const context = popout?.context ?? {}
  const resultManager = context?.manager ?? documentManager
  const inputValue = cleanGraph(context?.value ?? {})
  const fields = omit(context?.fields ?? {}, '_type', '_id')
  const onChange = context?.onChange ?? (() => undefined)

  const proxyOnChange = (key, value) => {
    const nextValue = {
      ...inputValue,
      [key]: value
    }

    popoutsStore.updateCurrentContext({
      value: nextValue
    })

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
