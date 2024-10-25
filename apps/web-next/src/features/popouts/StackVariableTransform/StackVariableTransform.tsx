import { FC, useContext, useMemo, useState } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import InputText from '@/app/components/InputText/InputText'
import { useLayerInvoker } from '@/shared/hooks/fragmentBuilder/useLayerInvoker'
import { POPOUT_TYPE, popoutsStore } from '@/shared/store/popouts.store'
import InputNumber from '@/app/components/InputNumber/InputNumber'
import Stepper from '@/app/components/Stepper/Stepper'
import Slider from '@/app/components/Slider/Slider'
import ControlRow from '@/builder/components/ControlRow/ControlRow'
import ControlRowWide from '@/builder/components/ControlRow/components/ControlRowWide/ControlRowWide'
import TabsSelector, { TabsSelectorItem } from '@/app/components/TabsSelector'
import { useGraph, useGraphStack } from '@graph-state/react'
import { capitalize } from '@/app/utils/capitalize'
import { BuilderContext } from '@/shared/providers/BuilderContext'
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
  const { value: computedValueLink, valueReferenceOptions, onReset } = popout.context ?? {}
  const [computedValue] = useGraph(documentManager, computedValueLink)
  const [inputVariable] = useGraph(documentManager, computedValue.inputValue)

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
          valueReferenceOptions={valueReferenceOptions}
        />
      ))}
    </div>
  )
}

export default StackVariableTransform
