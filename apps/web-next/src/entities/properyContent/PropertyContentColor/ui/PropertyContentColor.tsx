import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { ControlRow, ControlRowWide } from '@/shared/ui/ControlRow'
import { InputText } from '@/shared/ui/InputText'
import { TabsSelector } from '@/shared/ui/TabsSelector'
import { Textarea } from '@/shared/ui/Textarea'
import { DispatchValue } from '@/shared/types'
import { booleanTabsSelectorItems } from '@/shared/data'
import { InputSelect } from '@/shared/ui/InputSelect'

interface PropertyContentColorProps {
  id: string | null
  name: DispatchValue<string>
  required: DispatchValue<boolean>
  defaultValue: DispatchValue<string>
  openColorPicker?: () => void
  className?: string
}

export const PropertyContentColor: FC<PropertyContentColorProps> = ({
  className,
  id,
  name,
  required,
  defaultValue,
  openColorPicker
}) => {
  return (
    <div className={cn(styles.root, className)}>
      {id && (
        <ControlRow title='ID'>
          <ControlRowWide>
            <InputText value={id} disabled />
          </ControlRowWide>
        </ControlRow>
      )}
      <ControlRow title='Name'>
        <ControlRowWide>
          <InputText value={name.value} onChangeValue={name.onChange} />
        </ControlRowWide>
      </ControlRow>
      <ControlRow title='Required'>
        <ControlRowWide>
          <TabsSelector
            items={booleanTabsSelectorItems}
            value={required.value}
            onChange={({ name }) => required.onChange(name)}
          />
        </ControlRowWide>
      </ControlRow>
      <ControlRow title='Color'>
        <ControlRowWide>
          <InputSelect hasIcon color={defaultValue.value} onClick={openColorPicker}>
            {defaultValue.value}
          </InputSelect>
        </ControlRowWide>
      </ControlRow>
    </div>
  )
}
