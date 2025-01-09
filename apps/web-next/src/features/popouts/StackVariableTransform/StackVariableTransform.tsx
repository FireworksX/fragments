import { FC, useContext, useMemo, useState } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { POPOUT_TYPE, popoutsStore } from '@/shared/store/popouts.store'
import { useGraph, useGraphStack } from '@graph-state/react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { popoutNames } from '@/shared/data'
import { TabsSelectorItem } from '@/shared/ui/TabsSelector'
import { ControlRow, ControlRowWide } from '@/shared/ui/ControlRow'
import { InputSelectVariable } from '@/shared/ui/InputSelectVariable'
import { StackTransformSection } from './components/StackTransformSection/StackTransformSection'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'

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
  const { documentManager } = useBuilderDocument()
  const [popout] = useGraph(popoutsStore, `${POPOUT_TYPE}:${popoutNames.stackVariableTransform}`)
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
