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
import { useGraph, useGraphStack } from '@graph-state/react'
import { capitalize } from '@/app/utils/capitalize'
import { BuilderContext } from '@/builder/BuilderContext'
import { InputSelectVariable } from '@/app/components/InputSelectVariable/InputSelectVariable'
import { StackTransformSection } from '@/builder/StackCollector/components/variables/StackVariableTransform/components/StackTransformSection/StackTransformSection'

export const stackVariableTransformName = 'stackVariableTransform'

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

const StackVariableTransform: FC<StackBooleanVariableProps> = ({ className }) => {
  const { documentManager } = useContext(BuilderContext)
  const [popout] = useGraph(popoutsStore, `${POPOUT_TYPE}:${stackVariableTransformName}`)
  const { value: computedValueLink, onReset } = popout.context ?? {}
  const [computedValue] = useGraph(documentManager, computedValueLink)
  const [inputVariable] = useGraph(documentManager, computedValue.inputValue)
  // const layerInvoker = useLayerInvoker(context.variableKey, ({ node, value, prevValue, key }) => {
  //   if (key === 'name') {
  //     node.rename(value)
  //   }
  //
  //   if (['required', 'defaultValue'].includes(key)) {
  //     node[`set${capitalize(key)}`](value)
  //   }
  // })

  // const nameInvoker = layerInvoker('name')
  // const requiredInvoker = layerInvoker('required')
  // const defaultValueInvoker = layerInvoker('defaultValue')

  return (
    <div className={cn(styles.root, className)}>
      <ControlRow title='Variable'>
        <ControlRowWide>
          <InputSelectVariable type={inputVariable.type} kind='variable' onReset={onReset}>
            {inputVariable.name}
          </InputSelectVariable>
        </ControlRowWide>
      </ControlRow>
      {computedValue.transforms?.map((transformLink, index) => (
        <StackTransformSection
          key={transformLink}
          isFirst={index === 0}
          inputType={inputVariable.type}
          transformLink={transformLink}
        />
      ))}

      {/*<ControlRow title='Name'>*/}
      {/*  <ControlRowWide>*/}
      {/*    <InputText {...nameInvoker} />*/}
      {/*  </ControlRowWide>*/}
      {/*</ControlRow>*/}

      {/*<ControlRow title='Required'>*/}
      {/*  <ControlRowWide>*/}
      {/*    <TabsSelector*/}
      {/*      items={controls}*/}
      {/*      value={requiredInvoker.value}*/}
      {/*      onChange={({ name }) => requiredInvoker.onChange(name)}*/}
      {/*    />*/}
      {/*  </ControlRowWide>*/}
      {/*</ControlRow>*/}

      {/*<ControlRow title='Default value'>*/}
      {/*  <ControlRowWide>*/}
      {/*    <TabsSelector*/}
      {/*      items={controls}*/}
      {/*      value={defaultValueInvoker.value}*/}
      {/*      onChange={({ name }) => defaultValueInvoker.onChange(name)}*/}
      {/*    />*/}
      {/*  </ControlRowWide>*/}
      {/*</ControlRow>*/}
    </div>
  )
}

export default StackVariableTransform
