import { FC } from 'react'
import BuilderControlRowWide from '../../../../../routes/BuilderRoute/widgets/BuilderControls/components/BuilderControlRow/components/BuilderControlRowWide/BuilderControlRowWide'
import BuilderControlRow from '../../../../../routes/BuilderRoute/widgets/BuilderControls/components/BuilderControlRow/BuilderControlRow'
import { NumberType } from '@adstore/statex-builder-plugin/src/types/componentProperties'
import InputText from '../../../../../components/InputText/InputText'
import InputNumber from '../../../../../components/InputNumber/InputNumber'
import Slider from '../../../../../components/Slider/Slider'
import Button from '../../../../../components/Button/Button'
import Stepper from '../../../../../components/Stepper/Stepper'
import TabsSelector, { TabsSelectorItem } from '../../../../../components/TabsSelector/TabsSelector'

interface ComponentVariableNumberProps extends NumberType {
  className?: string
  onChange(nextType: NumberType): void
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

const ComponentVariableNumber: FC<ComponentVariableNumberProps> = ({ onChange, ...property }) => {
  const handleChange = (key: keyof NumberType, value: any) =>
    onChange({
      ...property,
      [key]: value
    })

  const changeStep = (nextValue: number) => {
    handleChange('step', nextValue > property.step ? property.step * 10 : property.step / 10)
  }

  return (
    <>
      <BuilderControlRow title='Name'>
        <BuilderControlRowWide>
          <InputText value={property.name} onChange={value => handleChange('name', value)} />
        </BuilderControlRowWide>
      </BuilderControlRow>
      <BuilderControlRow title='Default value'>
        <InputNumber
          value={property.defaultValue}
          step={property.step}
          min={property.min}
          max={property.max}
          onChange={value => handleChange('defaultValue', value)}
        />
        {property.displayStepper ? (
          <Stepper
            value={property.defaultValue}
            step={property.step}
            min={property.min}
            max={property.max}
            onChange={value => handleChange('defaultValue', value)}
          />
        ) : (
          <Slider
            value={property.defaultValue}
            step={property.step}
            min={property.min}
            max={property.max}
            onChange={value => handleChange('defaultValue', value)}
          />
        )}
      </BuilderControlRow>
      <BuilderControlRow title='Min'>
        <InputNumber value={property.min} onChange={value => handleChange('min', value)} />
        <Button mode='secondary' onClick={() => handleChange('min', Infinity)}>
          Clear
        </Button>
      </BuilderControlRow>
      <BuilderControlRow title='Max'>
        <InputNumber value={property.max} onChange={value => handleChange('max', value)} />
        <Button mode='secondary' onClick={() => handleChange('max', Infinity)}>
          Clear
        </Button>
      </BuilderControlRow>
      <BuilderControlRow title='Step'>
        <InputNumber value={property.step} onChange={value => changeStep(+value)} />
        <Stepper value={property.step} onChange={value => changeStep(+value)} />
      </BuilderControlRow>
      <BuilderControlRow title='Control'>
        <BuilderControlRowWide>
          <TabsSelector
            items={controls}
            value={property.displayStepper ? 'stepper' : 'slider'}
            onChange={({ name }) => handleChange('displayStepper', name === 'stepper')}
          />
        </BuilderControlRowWide>
      </BuilderControlRow>
    </>
  )
}

export default ComponentVariableNumber
