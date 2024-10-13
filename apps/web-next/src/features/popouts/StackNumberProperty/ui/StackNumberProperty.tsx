import { FC, useContext, useMemo, useState } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { useLayerInvoker } from '@/shared/hooks/fragmentBuilder/useLayerInvoker'
import { POPOUT_TYPE, popoutsStore } from '@/shared/store/popouts.store'
import { useGraph } from '@graph-state/react'
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

const StackNumberProperty: FC<StackNumberVariableProps> = ({ className }) => {
  const [popout] = useGraph(popoutsStore, `${POPOUT_TYPE}:${popoutNames.stackNumberProperty}`)
  const context = popout?.context ?? {}
  const layerInvoker = useLayerInvoker(context.propertyLink, ({ node, value, prevValue, key }) => {
    if (key === 'name') {
      node.rename(value)
    }

    if (key === 'step') {
      node.setStep(
        value >= animatableValue(prevValue) ? animatableValue(prevValue) * 10 : animatableValue(prevValue) / 10
      )
    }

    if (key === 'displayStepper') {
      node.setDisplayStepper(value)
    }

    if (['required', 'min', 'max', 'defaultValue'].includes(key)) {
      node[`set${capitalize(key)}`](value)
    }
  })

  const nameInvoker = layerInvoker('name')
  const requiredInvoker = layerInvoker('required')
  const defaultValueInvoker = layerInvoker('defaultValue')
  const stepInvoker = layerInvoker('step')
  const minInvoker = layerInvoker('min')
  const maxInvoker = layerInvoker('max')
  const displayStepperInvoker = layerInvoker('displayStepper')

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
            items={requiredControls}
            value={requiredInvoker.value}
            onChange={({ name }) => requiredInvoker.onChange(name)}
          />
        </ControlRowWide>
      </ControlRow>
      <ControlRow title='Default value'>
        <InputNumber
          value={defaultValueInvoker.value}
          step={stepInvoker.value}
          min={minInvoker.value}
          max={maxInvoker.value}
          onChange={defaultValueInvoker.onChange}
        />
        {displayStepperInvoker.value ? (
          <Stepper
            value={defaultValueInvoker.value}
            step={stepInvoker.value}
            min={minInvoker.value}
            max={maxInvoker.value}
            onChange={defaultValueInvoker.onChange}
          />
        ) : (
          <Slider
            value={defaultValueInvoker.value}
            step={stepInvoker.value}
            min={minInvoker.value}
            max={maxInvoker.value}
            onChange={defaultValueInvoker.onChange}
          />
        )}
      </ControlRow>
      <ControlRow title='Min'>
        <InputNumber value={minInvoker.value} onChange={minInvoker.onChange} />
        <Button mode='secondary' onClick={() => minInvoker.onChange(1)}>
          Clear
        </Button>
      </ControlRow>
      <ControlRow title='Max'>
        <InputNumber value={maxInvoker.value} onChange={maxInvoker.onChange} />
        <Button mode='secondary' onClick={() => minInvoker.onChange(100)}>
          Clear
        </Button>
      </ControlRow>
      <ControlRow title='Step'>
        <InputNumber value={stepInvoker.value} step={0.01} onChange={stepInvoker.onChange} />
        <Stepper value={stepInvoker.value} onChange={stepInvoker.onChange} />
      </ControlRow>
      <ControlRow title='Control'>
        <ControlRowWide>
          <TabsSelector
            items={controls}
            value={displayStepperInvoker.value ? 'stepper' : 'slider'}
            onChange={({ name }) => displayStepperInvoker.onChange(name === 'stepper')}
          />
        </ControlRowWide>
      </ControlRow>
    </div>
  )
}

export default StackNumberProperty
