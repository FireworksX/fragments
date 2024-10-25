import { FC } from 'react'
import { Panel } from '@/shared/ui/Panel'
import { ControlRow, ControlRowWide } from '@/shared/ui/ControlRow'
import { InputText } from '@/shared/ui/InputText'
import { InputSelect } from '@/shared/ui/InputSelect'
import { InputNumber } from '@/shared/ui/InputNumber'
import { Slider } from '@/shared/ui/Slider'
import { TabsSelector } from '@/shared/ui/TabsSelector'
import { booleanTabsSelectorItems } from '@/shared/data'

interface ConfigureStreamCommonProps {
  filters: unknown[]
  fragments: unknown[]
  name: string
  onChangeName(value: string): void
  weight: number
  onChangeWeight(value: number): void
  active: boolean
  onChangeActive(value: boolean): void
  onEditFilter(): void
  onEditFragments(): void
}

export const ConfigureStreamCommon: FC<ConfigureStreamCommonProps> = ({
  filters,
  fragments,
  name,
  onChangeName,
  weight,
  onChangeWeight,
  active,
  onChangeActive,
  onEditFragments,
  onEditFilter
}) => {
  return (
    <Panel>
      <ControlRow title='Name'>
        <ControlRowWide>
          <InputText placeholder='Stream Name' value={name} onChangeValue={onChangeName} />
        </ControlRowWide>
      </ControlRow>

      <ControlRow title='Weight'>
        <InputNumber min={0} max={100} value={weight} onChange={onChangeWeight} />
        <Slider min={0} max={100} value={weight} onChange={onChangeWeight} />
      </ControlRow>

      <ControlRow title='Active'>
        <ControlRowWide>
          <TabsSelector items={booleanTabsSelectorItems} value={active} onChange={({ name }) => onChangeActive(name)} />
        </ControlRowWide>
      </ControlRow>

      <ControlRow title='Filters'>
        <ControlRowWide>
          <InputSelect hasIcon={false} placeholder='Add filters...' onClick={onEditFilter}>
            {filters?.length && 'Edit filters'}
          </InputSelect>
        </ControlRowWide>
      </ControlRow>

      <ControlRow title='Fragments'>
        <ControlRowWide>
          <InputSelect hasIcon={false} placeholder='Add fragments...' onClick={onEditFragments}>
            {fragments?.length && 'Edit fragments'}
          </InputSelect>
        </ControlRowWide>
      </ControlRow>
    </Panel>
  )
}
