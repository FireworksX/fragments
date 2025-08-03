import { FC, useContext, useMemo, useState } from 'react'
import cn from 'classnames'
import { definition } from '@fragmentsx/definition'
import styles from './styles.module.css'
import { useLayerInvoker } from '@/shared/hooks/fragmentBuilder/useLayerInvoker'
import { POPOUT_TYPE, popoutsStore } from '@/shared/store/popouts.store'
import { useGraph } from '@graph-state/react'
import { animatableValue } from '@/shared/utils/animatableValue'
import { TabsSelector, TabsSelectorItem } from '@/shared/ui/TabsSelector'
import { capitalize } from '@/shared/utils/capitalize'
import { ControlRow, ControlRowWide } from '@/shared/ui/ControlRow'

import { popoutNames } from '@/shared/data'
import { useLayerValue } from '@/shared/hooks/fragmentBuilder/useLayerValue'
import { InputSelect } from '@/shared/ui/InputSelect'
import { interactions } from '@fragmentsx/definition/dist/constants'
import { Select } from '@/shared/ui/Select'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'

interface StackNumberVariableProps {
  className?: string
}

export const StackInteraction: FC<StackNumberVariableProps> = ({ className }) => {
  const [popout] = useGraph(popoutsStore, `${POPOUT_TYPE}:${popoutNames.stackInteraction}`)
  const { on, event, onChangeOn } = popout?.context ?? {}
  const { documentManager } = useBuilderDocument()
  const [eventData] = useGraph(documentManager, event)

  return (
    <div className={cn(styles.root, className)}>
      <ControlRow title='On'>
        <ControlRowWide>
          <Select value={on} onChange={onChangeOn}>
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
            popoutsStore.open(popoutNames.stackEventProperty, {
              initial: false,
              context: {
                propertyLink: event
              }
            })
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
