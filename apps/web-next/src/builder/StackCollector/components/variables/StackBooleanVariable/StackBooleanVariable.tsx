import { FC, useContext, useMemo, useState } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import InputText from '@/app/components/InputText/InputText'
import { useLayerInvoker } from '@/builder/hooks/useLayerInvoker'
import { POPOUT_TYPE, popoutsStore } from '@/app/store/popouts.store'
import InputNumber from '@/app/components/InputNumber/InputNumber'
import Stepper from '@/app/components/Stepper/Stepper'
import Slider from '@/app/components/Slider/Slider'
import ControlRow from '@/builder/components/ControlRow/ControlRow'
import ControlRowWide from '@/builder/components/ControlRow/components/ControlRowWide/ControlRowWide'
import TabsSelector, { TabsSelectorItem } from '@/app/components/TabsSelector'
import { useGraph } from '@graph-state/react'
import { capitalize } from '@/app/utils/capitalize'

export const stackBooleanVariableName = 'stackBooleanVariable'

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

const StackBooleanVariable: FC<StackBooleanVariableProps> = ({ className }) => {
  const [popout] = useGraph(popoutsStore, `${POPOUT_TYPE}:${stackBooleanVariableName}`)
  const context = popout.context ?? {}
  const layerInvoker = useLayerInvoker(context.variableKey, ({ node, value, prevValue, key }) => {
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
          <InputText {...nameInvoker} />
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

export default StackBooleanVariable
