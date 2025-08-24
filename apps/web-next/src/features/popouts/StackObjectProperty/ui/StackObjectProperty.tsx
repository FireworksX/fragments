import React, { FC, useRef } from 'react'
import cn from 'classnames'
import { definition } from '@fragmentsx/definition'
import { createLayer } from '@fragmentsx/render-suite'
import styles from './styles.module.css'
import { POPOUT_TYPE, popoutsStore } from '@/shared/store/popouts.store'
import { useGraph, GraphValue } from '@graph-state/react'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { PropertyContentObject } from '@/entities/properyContent/PropertyContentObject'
import { popoutNames } from '@/shared/data'
import { useLayerValue } from '@/shared/hooks/fragmentBuilder/useLayerValue'
import { useFragmentProperties } from '@/shared/hooks/fragmentBuilder/useFragmentProperties'
import { omit, setKey } from '@fragmentsx/utils'
import { InstancePropertyGeneric } from '@/widgets/fragmentBuilder/BuilderFragmentInstance/ui/components/InstancePropertyGeneric'
import { PropertyGenericCell } from '@/entities/fragment/PropertyGenericCell'
import { ControlRow, ControlRowWide } from '@/shared/ui/ControlRow'
import { capitalize } from '@/shared/utils/capitalize'
import { Instance } from '@/shared/ui/Popover/ui/Popover'

interface StackObjectVariableProps {
  className?: string
}

export const StackObjectProperty: FC<StackObjectVariableProps> = ({ className }) => {
  const { createProperty } = useFragmentProperties()
  const { documentManager } = useBuilderDocument()
  const [popout] = useGraph(popoutsStore, `${POPOUT_TYPE}:${popoutNames.stackObjectProperty}`)
  const context = popout?.context ?? {}
  const id = documentManager.entityOfKey(context.propertyLink)?._id
  const [name, setName] = useLayerValue('name', context?.propertyLink)
  const [required, setRequired] = useLayerValue('required', context?.propertyLink)
  const [defaultValue, setDefaultValue] = useLayerValue('defaultValue', context?.propertyLink)
  const [fields, setFields] = useLayerValue('fields', context?.propertyLink)
  const cleanFields = omit(fields, '_id', '_type')

  const handleAddField = (key, type) => {
    const propertyLink = createProperty({ type, parent: context?.propertyLink })

    setFields({
      [key]: propertyLink
    })
  }

  return (
    <div className={cn(styles.root, className)}>
      <PropertyContentObject
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
        fields={Object.entries(cleanFields).map(([key, fieldLink]) => (
          <PropertyGenericCell key={fieldLink} name={key} propertyLink={fieldLink} editOptions={{ initial: false }} />
        ))}
        onAddField={handleAddField}
      />
    </div>
  )
}

export default StackObjectProperty
