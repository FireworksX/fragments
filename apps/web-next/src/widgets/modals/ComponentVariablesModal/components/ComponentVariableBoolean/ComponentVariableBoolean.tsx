import { FC } from 'react'
import BuilderControlRowWide from '../../../../../routes/BuilderRoute/widgets/BuilderControls/components/BuilderControlRow/components/BuilderControlRowWide/BuilderControlRowWide'
import BuilderControlRow from '../../../../../routes/BuilderRoute/widgets/BuilderControls/components/BuilderControlRow/BuilderControlRow'
import InputText from '../../../../../components/InputText/InputText'
import TabsSelector, { TabsSelectorItem } from '../../../../../components/TabsSelector/TabsSelector'
import { BooleanType } from '../../../../../types/componentProperties'

interface ComponentVariableBooleanProps extends BooleanType {
  className?: string
  onChange(nextType: BooleanType): void
}

const controls: TabsSelectorItem[] = [
  {
    name: 'yes',
    label: 'Yes'
  },
  {
    name: 'no',
    label: 'No'
  }
]

const ComponentVariableBoolean: FC<ComponentVariableBooleanProps> = ({ onChange, ...property }) => {
  const handleChange = (key: keyof BooleanType, value: any) =>
    onChange({
      ...property,
      [key]: value
    })

  return (
    <>
      <BuilderControlRow title='Name'>
        <BuilderControlRowWide>
          <InputText value={property.name} onChange={value => handleChange('name', value)} />
        </BuilderControlRowWide>
      </BuilderControlRow>
      <BuilderControlRow title='Default'>
        <BuilderControlRowWide>
          <TabsSelector
            items={controls}
            value={property.defaultValue ? 'yes' : 'no'}
            onChange={({ name }) => handleChange('defaultValue', name === 'yes')}
          />
        </BuilderControlRowWide>
      </BuilderControlRow>
    </>
  )
}

export default ComponentVariableBoolean
