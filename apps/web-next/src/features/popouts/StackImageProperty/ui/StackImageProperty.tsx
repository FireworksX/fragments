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
import { booleanTabsSelectorItems, popoutNames } from '@/shared/data'
import { ControlRow, ControlRowWide } from '@/shared/ui/ControlRow'
import { InputText } from '@/shared/ui/InputText'
import { Textarea, TextareaAnimated } from '@/shared/ui/Textarea'
import { useLayerValue } from '@/shared/hooks/fragmentBuilder/useLayerValue'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { PropertyContentString } from '@/entities/properyContent/PropertyContentString'
import { Button } from '@/shared/ui/Button'
import { CommonLogo } from '@/shared/ui/CommonLogo'
import { InstancePropertyColor } from '@/widgets/fragmentBuilder/BuilderFragmentInstance/ui/components/InstancePropertyColor'
import { InstancePropertyImage } from '@/widgets/fragmentBuilder/BuilderFragmentInstance/ui/components/InstancePropertyImage'

interface StackImagePropertyProps {
  className?: string
}

export const StackImageProperty: FC<StackImagePropertyProps> = ({ className }) => {
  const [popout] = useGraph(popoutsStore, `${POPOUT_TYPE}:${popoutNames.stackImageProperty}`)
  const context = popout?.context ?? {}
  const id = entityOfKey(context.propertyLink)?._id
  const [name, setName] = useLayerValue('name', context?.propertyLink)
  const [required, setRequired] = useLayerValue('required', context?.propertyLink)
  const [imageSize, setImageSize] = useLayerValue('imageSize', context?.propertyLink)
  const [defaultValue, setDefaultValue] = useLayerValue('defaultValue', context?.propertyLink)

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
          <InputText value={name} onChangeValue={setName} />
        </ControlRowWide>
      </ControlRow>
      <ControlRow title='Required'>
        <ControlRowWide>
          <TabsSelector items={booleanTabsSelectorItems} value={required} onChange={({ name }) => setRequired(name)} />
        </ControlRowWide>
      </ControlRow>
      <InstancePropertyImage
        name='Default Value'
        value={defaultValue}
        scaleMode={imageSize}
        onChangeScaleMode={setImageSize}
        onChange={setDefaultValue}
      />
    </div>
  )
}
