import React, { FC, useContext, useMemo, useState } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useLayerInvoker } from '@/shared/hooks/fragmentBuilder/useLayerInvoker'
import { POPOUT_TYPE, popoutsStore } from '@/shared/store/popouts.store'
import { useGraph } from '@graph-state/react'
import { TabsSelector, TabsSelectorItem } from '@/shared/ui/TabsSelector'
import { capitalize } from '@/shared/utils/capitalize'
import { popoutNames } from '@/shared/data'
import { ControlRow, ControlRowWide } from '@/shared/ui/ControlRow'
import { InputText, InputTextAnimated } from '@/shared/ui/InputText'
import { Textarea, TextareaAnimated } from '@/shared/ui/Textarea'
import { useLayerValue } from '@/shared/hooks/fragmentBuilder/useLayerValue'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { PropertyReference } from '@/features/PropertyReference'

interface StackEnumPropertyProps {
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

export const StackEnumProperty: FC<StackEnumPropertyProps> = ({ className }) => {
  const { documentManager } = useBuilderDocument()
  const [popout] = useGraph(popoutsStore, `${POPOUT_TYPE}:${popoutNames.stackEnumProperty}`)
  const context = popout?.context ?? {}
  const id = documentManager.entityOfKey(context.propertyLink)?._id
  const nodePropertyControlReference = documentManager.resolve(context.propertyLink)?.nodePropertyControlReference
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
      <ControlRow title='Default'>
        <ControlRowWide>
          <PropertyReference type={nodePropertyControlReference} value={defaultValue} onChange={setDefaultValue} />
        </ControlRowWide>
      </ControlRow>
    </div>
  )
}
