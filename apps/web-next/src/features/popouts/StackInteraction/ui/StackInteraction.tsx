import { FC, useContext, useMemo, useState } from 'react'
import cn from 'classnames'
import { definition } from '@fragmentsx/definition'
import styles from './styles.module.css'
import { useLayerInvoker } from '@/shared/hooks/fragmentBuilder/useLayerInvoker'
import { useGraph } from '@graph-state/react'
import { animatableValue } from '@/shared/utils/animatableValue'
import { TabsSelector, TabsSelectorItem } from '@/shared/ui/TabsSelector'
import { capitalize } from '@/shared/utils/capitalize'
import { ControlRow, ControlRowWide } from '@/shared/ui/ControlRow'
import { popoutNames } from '@/shared/data'
import { useLayerValue } from '@/shared/hooks/fragmentBuilder/useLayerValue'
import { InputSelect } from '@/shared/ui/InputSelect'
import { Select } from '@/shared/ui/Select'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { useStack } from '@/shared/hooks/useStack'

export interface StackInteractionContext {
  propertyLink: any
  on: keyof typeof definition.interactions
  onChangeOn: (value: keyof typeof definition.interactions) => void
}

interface StackNumberVariableProps {
  className?: string
}

export const StackInteraction: FC<StackNumberVariableProps> = ({ className }) => {
  const stack = useStack()
  const context = stack.readContext(popoutNames.stackInteraction) ?? {}
  const { documentManager } = useBuilderDocument()
  const [eventData] = useGraph(documentManager, event)

  return (
    <div className={cn(styles.root, className)}>
      <ControlRow title='On'>
        <ControlRowWide>
          <Select value={context.on} onChange={context.onChangeOn}>
            {Object.keys(definition.interactions).map(interaction => (
              <option key={interaction} value={interaction}>
                {capitalize(interaction)}
              </option>
            ))}
          </Select>
        </ControlRowWide>
      </ControlRow>
      <ControlRow
        title='Event'
        hasConnector
        variable={{
          data: eventData,
          onClick: () => {
            stack.open(
              popoutNames.stackEventProperty,
              {
                propertyLink: event
              },
              {
                initial: false
              }
            )
          }
        }}
      >
        <ControlRowWide>
          <InputSelect />
        </ControlRowWide>
      </ControlRow>
    </div>
  )
}
