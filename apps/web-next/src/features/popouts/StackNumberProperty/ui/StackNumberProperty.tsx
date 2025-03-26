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
import { useLayerValue } from '@/shared/hooks/fragmentBuilder/useLayerValue'

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
  const [name, setName] = useLayerValue('name', context.propertyLink)
  const [required, setRequired] = useLayerValue('required', context.propertyLink)
  const [defaultValue, setDefaultValue] = useLayerValue('defaultValue', context.propertyLink)
  const [step, setStep] = useLayerValue('step', context.propertyLink)
  const [min, setMin] = useLayerValue('min', context.propertyLink)
  const [max, setMax] = useLayerValue('max', context.propertyLink)
  const [displayStepper, setDisplayStepper] = useLayerValue('displayStepper', context.propertyLink)

  const proxySetStep = value => {
    setStep(value >= animatableValue(step) ? animatableValue(step) * 10 : animatableValue(step) / 10)
  }

  return (
    <div className={cn(styles.root, className)}>
      <ControlRow title='Name'>
        <ControlRowWide>
          <InputText value={name} onChangeValue={setName} />
        </ControlRowWide>
      </ControlRow>
      <ControlRow title='Required'>
        <ControlRowWide>
          <TabsSelector items={requiredControls} value={required} onChange={({ name }) => setRequired} />
        </ControlRowWide>
      </ControlRow>
      <ControlRow title='Default value'>
        <InputNumber value={defaultValue} step={step} min={min} max={max} onChange={setDefaultValue} />
        {displayStepper ? (
          <Stepper value={defaultValue} step={step} min={min} max={max} onChange={setDefaultValue} />
        ) : (
          <Slider value={defaultValue} step={step} min={min} max={max} onChange={setDefaultValue} />
        )}
      </ControlRow>

      <ControlRow title='Min'>
        <InputNumber value={min} onChange={setMin} />
        <Button mode='secondary' onClick={() => setMin(1)}>
          Clear
        </Button>
      </ControlRow>
      <ControlRow title='Max'>
        <InputNumber value={max} onChange={setMax} />
        <Button mode='secondary' onClick={() => setMax(100)}>
          Clear
        </Button>
      </ControlRow>
      <ControlRow title='Step'>
        <InputNumber value={step} step={0.01} onChange={proxySetStep} />
        <Stepper value={step} onChange={proxySetStep} />
      </ControlRow>
      <ControlRow title='Control'>
        <ControlRowWide>
          <TabsSelector
            items={controls}
            value={displayStepper ? 'stepper' : 'slider'}
            onChange={({ name }) => setDisplayStepper(name === 'stepper')}
          />
        </ControlRowWide>
      </ControlRow>
    </div>
  )
}

export default StackNumberProperty
