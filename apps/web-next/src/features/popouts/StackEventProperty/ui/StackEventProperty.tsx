import { FC, useContext, useMemo, useState } from 'react'
import cn from 'classnames'
import { definition } from '@fragmentsx/definition'
import styles from './styles.module.css'
import { useLayerInvoker } from '@/shared/hooks/fragmentBuilder/useLayerInvoker'
import { animatableValue } from '@/shared/utils/animatableValue'
import { TabsSelector, TabsSelectorItem } from '@/shared/ui/TabsSelector'
import { capitalize } from '@/shared/utils/capitalize'
import { ControlRow, ControlRowWide } from '@/shared/ui/ControlRow'
import { InputText } from '@/shared/ui/InputText'
import { InputNumber } from '@/shared/ui/InputNumber'
import { Stepper } from '@/shared/ui/Stepper'
import { Slider } from '@/shared/ui/Slider'
import { Button } from '@/shared/ui/Button'
import { popoutNames } from '@/shared/data'
import { useLayerValue } from '@/shared/hooks/fragmentBuilder/useLayerValue'
import { InputSelect } from '@/shared/ui/InputSelect'
import GoalIcon from '@/shared/icons/next/circle-dot.svg'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { useStack } from '@/shared/hooks/useStack'

export interface StackEventPropertyContext {
  propertyLink: any
}

interface StackNumberVariableProps {
  className?: string
}

const controls: TabsSelectorItem[] = [
  {
    name: 'slider',
    label: 'Slider'
  },
  {
    name: 'stepper',
    label: 'Stepper'
  }
]

const requiredControls: TabsSelectorItem[] = [
  {
    name: true,
    label: 'Yes'
  },
  {
    name: false,
    label: 'No'
  }
]

export const StackEventProperty: FC<StackNumberVariableProps> = ({ className }) => {
  const { documentManager } = useBuilderDocument()
  const stack = useStack()
  const context = stack.readContext(popoutNames.stackEventProperty) ?? {}
  const id = documentManager.entityOfKey(context.propertyLink)?._id
  const [name, setName] = useLayerValue('name', context.propertyLink)
  const [required, setRequired] = useLayerValue('required', context.propertyLink)
  const [defaultValue, setDefaultValue] = useLayerValue('defaultValue', context.propertyLink)
  const [mode] = useLayerValue('mode', context.propertyLink)

  return (
    <div className={cn(styles.root, className)}>
      <ControlRow title='ID'>
        <ControlRowWide>
          <InputText value={id} disabled />
        </ControlRowWide>
      </ControlRow>
      <ControlRow title='Name'>
        <ControlRowWide>
          <InputText value={name} onChangeValue={setName} />
        </ControlRowWide>
      </ControlRow>
      <ControlRow title='Required'>
        <ControlRowWide>
          <TabsSelector items={requiredControls} value={required} onChange={({ name }) => setRequired(name)} />
        </ControlRowWide>
      </ControlRow>
      {mode === definition.eventMode.goal && (
        <ControlRow title='Goal'>
          <ControlRowWide>
            <InputSelect
              placeholder='Set goal...'
              icon={<GoalIcon style={{ color: 'var(--text-color)' }} />}
              color={'var(--primary)'}
              onClick={() =>
                stack.open(popoutNames.stackGoals, {
                  activeGoal: defaultValue?.code,
                  onSelect: goal => {
                    stack.goPrev()
                    setDefaultValue(goal)
                  }
                })
              }
            >
              {defaultValue?.name}
            </InputSelect>
          </ControlRowWide>
        </ControlRow>
      )}
    </div>
  )
}
