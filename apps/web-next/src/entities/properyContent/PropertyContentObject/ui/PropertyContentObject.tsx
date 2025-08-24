import React, { FC, ReactNode, useRef, useState } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { ControlRow, ControlRowWide } from '@/shared/ui/ControlRow'
import { InputText } from '@/shared/ui/InputText'
import { TabsSelector } from '@/shared/ui/TabsSelector'
import { Textarea } from '@/shared/ui/Textarea'
import { DispatchValue } from '@/shared/types'
import { booleanTabsSelectorItems } from '@/shared/data'
import { InputSelect } from '@/shared/ui/InputSelect'
import { Panel } from '@/shared/ui/Panel'
import { Button } from '@/shared/ui/Button'
import { Dropdown } from '@/shared/ui/Dropdown'
import { DropdownGroup } from '@/shared/ui/DropdownGroup'
import { DropdownOptionSelect } from '@/shared/ui/DropdownOptionSelect'
import { SelectMimicry } from '@/shared/ui/SelectMimicry'
import PlusIcon from '@/shared/icons/next/plus.svg'
import { DropdownOption } from '@/shared/ui/DropdownOption'
import { FRAGMENT_PROPERTY_TYPES } from '@/shared/hooks/fragmentBuilder/useFragmentProperties'
import { InstancePropertyGeneric } from '@/widgets/fragmentBuilder/BuilderFragmentInstance/ui/components/InstancePropertyGeneric'
import { Instance } from '@/shared/ui/Popover/ui/Popover'

interface PropertyContentObjectProps {
  id: string | null
  name: DispatchValue<string>
  required: DispatchValue<boolean>
  defaultValue: DispatchValue<string>
  fields: ReactNode
  className?: string
  onAddField?: (key: string, type: string) => void
}

export const PropertyContentObject: FC<PropertyContentObjectProps> = ({
  className,
  id,
  name,
  required,
  defaultValue,
  fields,
  onAddField
}) => {
  const [fieldKey, setFieldKey] = useState('')
  const [fieldType, setFieldType] = useState(null)
  const fieldsDropdownInstance = useRef<Instance | undefined>(undefined)

  const handleAddField = () => {
    onAddField(fieldKey, fieldType)
    setFieldType(null)
    setFieldKey('')
  }

  return (
    <div className={cn(styles.root, className)}>
      <Panel>
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
      </Panel>

      <Panel className={styles.fieldsPanel}>
        {fields}

        <ControlRow
          titleWrapperClassName={styles.fieldTitleWrapper}
          title={<InputText placeholder='Key' value={fieldKey} onChangeValue={setFieldKey} />}
        >
          <ControlRowWide>
            <Dropdown
              trigger='click'
              placement='bottom-end'
              appendTo='body'
              width='contentSize'
              hideOnClick
              arrow={false}
              options={
                <DropdownGroup>
                  {FRAGMENT_PROPERTY_TYPES.map(type => (
                    <DropdownOption
                      key={type}
                      preventDefault
                      onClick={() => {
                        fieldsDropdownInstance.current?.hide()
                        setFieldType(type)
                      }}
                    >
                      {type}
                    </DropdownOption>
                  ))}
                </DropdownGroup>
              }
              onCreate={instance => fieldsDropdownInstance.current === instance}
            >
              <SelectMimicry>{fieldType ?? 'Select Type'}</SelectMimicry>
            </Dropdown>
          </ControlRowWide>
        </ControlRow>

        <Button stretched mode='secondary' icon={<PlusIcon />} onClick={handleAddField}>
          Add field
        </Button>
      </Panel>
      {/*<ControlRow title='Color'>*/}
      {/*  <ControlRowWide>*/}
      {/*    <InputSelect hasIcon color={defaultValue.value} onClick={openColorPicker}>*/}
      {/*      {defaultValue.value}*/}
      {/*    </InputSelect>*/}
      {/*  </ControlRowWide>*/}
      {/*</ControlRow>*/}
    </div>
  )
}
