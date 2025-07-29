import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { ControlRow, ControlRowWide } from '@/shared/ui/ControlRow'
import { InputText } from '@/shared/ui/InputText'
import { TabsSelector } from '@/shared/ui/TabsSelector'
import { Textarea } from '@/shared/ui/Textarea'
import { DispatchValue } from '@/shared/types'
import { booleanTabsSelectorItems } from '@/shared/data'

interface PropertyContentStringProps {
  id: string | null
  name: DispatchValue<string>
  required: DispatchValue<boolean>
  placeholder: DispatchValue<string>
  isTextarea: DispatchValue<boolean>
  defaultValue: DispatchValue<string>
  className?: string
}

export const PropertyContentString: FC<PropertyContentStringProps> = ({
  className,
  id,
  name,
  isTextarea,
  required,
  placeholder,
  defaultValue
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
      <ControlRow title='Placeholder'>
        <ControlRowWide>
          <InputText value={placeholder.value} onChangeValue={placeholder.onChange} />
        </ControlRowWide>
      </ControlRow>
      <ControlRow title='Default Value'>
        <ControlRowWide>
          {isTextarea.value ? (
            <Textarea value={defaultValue.value} onChangeValue={defaultValue.onChange} />
          ) : (
            <InputText value={defaultValue.value} onChangeValue={defaultValue.onChange} />
          )}
        </ControlRowWide>
      </ControlRow>
      <ControlRow title='Textarea'>
        <ControlRowWide>
          <TabsSelector
            items={booleanTabsSelectorItems}
            value={isTextarea.value}
            onChange={({ name }) => isTextarea.onChange(name)}
          />
        </ControlRowWide>
      </ControlRow>
    </div>
  )
}
