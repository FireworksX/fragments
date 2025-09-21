import React, { FC, useContext, useMemo, useState } from 'react'
import cn from 'classnames'
import { entityOfKey, LinkKey } from '@graph-state/core'
import styles from './styles.module.css'
import { popoutNames } from '@/shared/data'
import { useLayerValue } from '@/shared/hooks/fragmentBuilder/useLayerValue'
import { PropertyContentString } from '@/entities/properyContent/PropertyContentString'
import { useStack } from '@/shared/hooks/useStack'

interface StackStringVariableProps {
  className?: string
}

export interface StackStringPropertyContext {
  propertyLink: LinkKey
}

export const StackStringProperty: FC<StackStringVariableProps> = ({ className }) => {
  const stack = useStack()
  const context = stack.readContext(popoutNames.stackStringProperty)
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
