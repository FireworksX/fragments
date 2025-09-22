import { FC, useContext, useMemo, useState } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { useLayerInvoker } from '@/shared/hooks/fragmentBuilder/useLayerInvoker'
import { TabsSelector, TabsSelectorItem } from '@/shared/ui/TabsSelector'
import { capitalize } from '@/shared/utils/capitalize'
import { ControlRow, ControlRowWide } from '@/shared/ui/ControlRow'
import { InputText } from '@/shared/ui/InputText'
import { popoutNames } from '@/shared/data'
import { useLayerValue } from '@/shared/hooks/fragmentBuilder/useLayerValue'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { useStack } from '@/shared/hooks/useStack'

export interface StackBooleanPropertyContext {
  propertyLink: any
}

interface StackBooleanVariableProps {
  className?: string
}

const controls: TabsSelectorItem[] = [
  {
    name: true,
    label: 'Yes'
  },
  {
    name: false,
    label: 'No'
  }
]

export const StackBooleanProperty: FC<StackBooleanVariableProps> = ({ className }) => {
  const { documentManager } = useBuilderDocument()
  const stack = useStack()
  const context = stack.readContext(popoutNames.stackBooleanProperty) ?? {}
  const id = documentManager.entityOfKey(context.propertyLink)?._id
  const [name, setName] = useLayerValue('name', context?.propertyLink)
  const [required, setRequired] = useLayerValue('required', context?.propertyLink)
  const [defaultValue, setDefaultValue] = useLayerValue('defaultValue', context?.propertyLink)

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
          <TabsSelector items={controls} value={required} onChange={({ name }) => setRequired(name)} />
        </ControlRowWide>
      </ControlRow>

      <ControlRow title='Default value'>
        <ControlRowWide>
          <TabsSelector items={controls} value={defaultValue} onChange={({ name }) => setDefaultValue(name)} />
        </ControlRowWide>
      </ControlRow>
    </div>
  )
}
