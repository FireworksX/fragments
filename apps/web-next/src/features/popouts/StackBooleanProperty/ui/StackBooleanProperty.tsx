import { FC, useContext, useMemo, useState } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { useLayerInvoker } from '@/shared/hooks/fragmentBuilder/useLayerInvoker'
import { POPOUT_TYPE, popoutsStore } from '@/shared/store/popouts.store'
import { useGraph } from '@graph-state/react'
import { TabsSelector, TabsSelectorItem } from '@/shared/ui/TabsSelector'
import { capitalize } from '@/shared/utils/capitalize'
import { ControlRow, ControlRowWide } from '@/shared/ui/ControlRow'
import { InputText } from '@/shared/ui/InputText'
import { popoutNames } from '@/shared/data'

interface StackBooleanVariableProps {
  className?: string
}

const controls: TabsSelectorItem[] = [
  {
    name: true,
    label: 'Yes'
  },
  {
    name: false,
    label: 'No'
  }
]

const StackBooleanProperty: FC<StackBooleanVariableProps> = ({ className }) => {
  const [popout] = useGraph(popoutsStore, `${POPOUT_TYPE}:${popoutNames.stackBooleanProperty}`)
  const context = popout?.context ?? {}
  const layerInvoker = useLayerInvoker(context.propertyLink, ({ node, value, prevValue, key }) => {
    if (key === 'name') {
      node.rename(value)
    }

    if (['required', 'defaultValue'].includes(key)) {
      node[`set${capitalize(key)}`](value)
    }
  })

  const nameInvoker = layerInvoker('name')
  const requiredInvoker = layerInvoker('required')
  const defaultValueInvoker = layerInvoker('defaultValue')

  return (
    <div className={cn(styles.root, className)}>
      <ControlRow title='Name'>
        <ControlRowWide>
          <InputText value={nameInvoker.value} onChangeValue={nameInvoker.onChange} />
        </ControlRowWide>
      </ControlRow>

      <ControlRow title='Required'>
        <ControlRowWide>
          <TabsSelector
            items={controls}
            value={requiredInvoker.value}
            onChange={({ name }) => requiredInvoker.onChange(name)}
          />
        </ControlRowWide>
      </ControlRow>

      <ControlRow title='Default value'>
        <ControlRowWide>
          <TabsSelector
            items={controls}
            value={defaultValueInvoker.value}
            onChange={({ name }) => defaultValueInvoker.onChange(name)}
          />
        </ControlRowWide>
      </ControlRow>
    </div>
  )
}

export default StackBooleanProperty
