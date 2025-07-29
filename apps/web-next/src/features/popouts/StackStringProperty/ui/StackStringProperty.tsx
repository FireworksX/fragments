import React, { FC, useContext, useMemo, useState } from 'react'
import cn from 'classnames'
import { entityOfKey } from '@graph-state/core'
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
import { PropertyContentString } from '@/entities/properyContent/PropertyContentString'

interface StackStringVariableProps {
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

export const StackStringProperty: FC<StackStringVariableProps> = ({ className }) => {
  const [popout] = useGraph(popoutsStore, `${POPOUT_TYPE}:${popoutNames.stackStringProperty}`)
  const context = popout?.context ?? {}
  const id = entityOfKey(context.propertyLink)?._id
  const [name, setName] = useLayerValue('name', context?.propertyLink)
  const [required, setRequired] = useLayerValue('required', context?.propertyLink)
  const [placeholder, setPlaceholder] = useLayerValue('placeholder', context?.propertyLink)
  const [isTextarea, setIsTextarea] = useLayerValue('isTextarea', context?.propertyLink)
  const [defaultValue, setDefaultValue] = useLayerValue('defaultValue', context?.propertyLink)

  return (
    <div className={cn(styles.root, className)}>
      <PropertyContentString
        id={id}
        name={{
          value: name,
          onChange: setName
        }}
        required={{
          value: required,
          onChange: setRequired
        }}
        placeholder={{
          value: placeholder,
          onChange: setPlaceholder
        }}
        isTextarea={{
          value: isTextarea,
          onChange: setIsTextarea
        }}
        defaultValue={{
          value: defaultValue,
          onChange: setDefaultValue
        }}
      />
    </div>
  )
}
