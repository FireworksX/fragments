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
import { AnimatedVisible } from '@/shared/ui/AnimatedVisible'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { useLayerValue } from '@/shared/hooks/fragmentBuilder/useLayerValue'
import { InputSelect } from '@/shared/ui/InputSelect'
import { objectToColorString } from '@fragmentsx/utils'
import { PropertyContentColor } from '@/entities/properyContent/PropertyContentColor'

interface StackColorPropertyProps {
  className?: string
}

export const StackColorProperty: FC<StackColorPropertyProps> = ({ className }) => {
  const { documentManager } = useBuilderDocument()
  const [popout] = useGraph(popoutsStore, `${POPOUT_TYPE}:${popoutNames.stackColorProperty}`)
  const context = popout?.context ?? {}
  const id = documentManager.entityOfKey(context.propertyLink)?._id
  const [name, setName] = useLayerValue('name', context?.propertyLink)
  const [required, setRequired] = useLayerValue('required', context?.propertyLink)
  const [defaultValue, setDefaultValue] = useLayerValue('defaultValue', context?.propertyLink)

  const openColorPicker = () => {
    popoutsStore.open(popoutNames.colorPicker, {
      context: {
        value: defaultValue,
        onChange: nextColor => {
          setDefaultValue(objectToColorString(nextColor))
        }
      }
    })
  }

  return (
    <div className={cn(styles.root, className)}>
      <PropertyContentColor
        id={id}
        name={{
          value: name,
          onChange: setName
        }}
        defaultValue={{
          value: defaultValue,
          onChange: setDefaultValue
        }}
        required={{
          value: required,
          onChange: setRequired
        }}
        openColorPicker={openColorPicker}
      />
    </div>
  )
}
