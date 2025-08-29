import React, { FC, ReactNode, useMemo, useRef, useState } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import DragHandlerIcon from '@/shared/icons/next/grip-vertical.svg'
import RemoveIcon from '@/shared/icons/next/trash.svg'
import { definition } from '@fragmentsx/definition'
import { ControlRow, ControlRowWide } from '@/shared/ui/ControlRow'
import { InputText } from '@/shared/ui/InputText'
import { TabsSelector } from '@/shared/ui/TabsSelector'
import { DispatchValue } from '@/shared/types'
import { booleanTabsSelectorItems } from '@/shared/data'
import { Panel } from '@/shared/ui/Panel'
import { Button } from '@/shared/ui/Button'
import { Instance } from '@/shared/ui/Popover/ui/Popover'
import { InstancePropertyGeneric } from '@/widgets/fragmentBuilder/BuilderFragmentInstance/ui/components/InstancePropertyGeneric'
import { GraphState, LinkKey } from '@graph-state/core'
import { PropertyGenericCell } from '@/entities/fragment/PropertyGenericCell'
import { Dropdown } from '@/shared/ui/Dropdown'
import { DropdownGroup } from '@/shared/ui/DropdownGroup'
import { FRAGMENT_PROPERTY_TYPES } from '@/shared/hooks/fragmentBuilder/useFragmentProperties'
import { DropdownOption } from '@/shared/ui/DropdownOption'
import { InputSelect } from '@/shared/ui/InputSelect'
import { useGraph } from '@graph-state/react'
import { useLayerValue } from '@/shared/hooks/fragmentBuilder/useLayerValue'
import { cleanGraph, generateId } from '@fragmentsx/utils'
import { Touchable } from '@/shared/ui/Touchable'
import { Sortable } from '@/shared/ui/Sortable'
import { nextTick } from '@/shared/utils/nextTick'

interface PropertyContentArrayProps {
  id: string | null
  manager: GraphState
  name: DispatchValue<string>
  required: DispatchValue<boolean>
  defaultValue: DispatchValue<unknown[]>
  definitionLink?: LinkKey
  className?: string
  onSelectSchema?: (type: keyof typeof definition.variableType) => void
}

export const PropertyContentArray: FC<PropertyContentArrayProps> = ({
  className,
  id,
  name,
  manager,
  required,
  defaultValue,
  definitionLink,
  onSelectSchema
}) => {
  const fieldsDropdownInstance = useRef<Instance | undefined>(undefined)
  const [definitionDefaultValue] = useLayerValue('defaultValue', definitionLink)

  /**
   * Сейчас есть проблема. Из-за того что при каждом перетаскивании генерируется
   * новый ключ, происходит ПЕРЕМОНТИРОВАНИЕ элемента списка
   *
   * В будущем нужно будет сделать чтобы каждый элемент в списке был объектом с ключом
   */
  const defaultValueWithStableKey = useMemo(
    () => (defaultValue.value ?? []).map(item => ({ item, key: generateId() })),
    [defaultValue.value]
  )

  const handleAddItem = () => {
    defaultValue.onChange([...defaultValue.value, definitionDefaultValue])
  }

  const handleRemoveItem = (index: number) => {
    nextTick(() => {
      defaultValue.onChange(defaultValue.value.toSpliced(index, 1))
    })
  }

  const handleUpdateValue = (index: number, nextValue: unknown) => {
    defaultValue.onChange(defaultValue.value.toSpliced(index, 1, nextValue))
  }

  const handleSort = items => {
    const sortedDefaultValue = items.map(
      item => defaultValueWithStableKey.find(stableItem => stableItem.key === item.key)?.item
    )

    defaultValue.onChange(sortedDefaultValue)
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

        {!!definitionLink ? (
          <PropertyGenericCell name='Schema' propertyLink={definitionLink} editOptions={{ initial: false }} />
        ) : (
          <ControlRow title='Schema'>
            <ControlRowWide>
              <Dropdown
                trigger='click'
                placement='bottom-end'
                width='contentSize'
                hideOnClick
                appendTo='body'
                disabled={!!definitionLink}
                arrow={false}
                onCreate={instance => (fieldsDropdownInstance.current = instance)}
                options={
                  <DropdownGroup>
                    {FRAGMENT_PROPERTY_TYPES.map(type => (
                      <DropdownOption
                        key={type}
                        preventDefault
                        onClick={() => {
                          onSelectSchema?.(type)
                          fieldsDropdownInstance?.current?.hide()
                        }}
                      >
                        {type}
                      </DropdownOption>
                    ))}
                  </DropdownGroup>
                }
              >
                <InputSelect hasIcon={false} placeholder='Define...'></InputSelect>
              </Dropdown>
            </ControlRowWide>
          </ControlRow>
        )}
      </Panel>

      {!!definitionLink && (
        <Panel className={styles.fieldsPanel}>
          {/*<Sortable onSort={handleSort}>*/}
          {defaultValueWithStableKey?.map(({ item: value, key }, index) => (
            <div className={styles.item} key={index}>
              <InstancePropertyGeneric
                property={definitionLink}
                manager={manager}
                value={cleanGraph(value)}
                hasConnector
                isHideTitle
                onChange={nextValue => handleUpdateValue(index, nextValue)}
              />
              <Touchable className={styles.remove} onClick={() => handleRemoveItem(index)}>
                <RemoveIcon />
              </Touchable>
            </div>
          ))}
          {/*</Sortable>*/}

          <ControlRow isHideTitle>
            <Button mode='secondary' stretched onClick={handleAddItem}>
              Add item
            </Button>
          </ControlRow>
        </Panel>
      )}
    </div>
  )
}
