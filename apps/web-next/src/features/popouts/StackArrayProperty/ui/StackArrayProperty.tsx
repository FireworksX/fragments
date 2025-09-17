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
import { FRAGMENT_PROPERTY_TYPES, useFragmentProperties } from '@/shared/hooks/fragmentBuilder/useFragmentProperties'
import { omit, setKey } from '@fragmentsx/utils'
import { InstancePropertyGeneric } from '@/widgets/fragmentBuilder/BuilderFragmentInstance/ui/components/InstancePropertyGeneric'
import { PropertyGenericCell } from '@/entities/fragment/PropertyGenericCell'
import { ControlRow, ControlRowWide } from '@/shared/ui/ControlRow'
import { capitalize } from '@/shared/utils/capitalize'
import { PropertyContentArray } from '@/entities/properyContent/PropertyContentArray'
import { DropdownGroup } from '@/shared/ui/DropdownGroup'
import { DropdownOption } from '@/shared/ui/DropdownOption'
import { InputSelect } from '@/shared/ui/InputSelect'
import { Dropdown } from '@/shared/ui/Dropdown'
import { Instance } from '@/shared/ui/Popover/ui/Popover'
import { VariableIcon } from '@/entities/fragment/VariableIcon'
import { copyLayer } from '@fragmentsx/render-suite'

interface StackArrayPropertyProps {
  className?: string
}

export const StackArrayProperty: FC<StackArrayPropertyProps> = ({ className }) => {
  const { createProperty } = useFragmentProperties()
  const { documentManager } = useBuilderDocument()
  const [popout] = useGraph(popoutsStore, `${POPOUT_TYPE}:${popoutNames.stackArrayProperty}`)
  const context = popout?.context ?? {}
  const id = documentManager.entityOfKey(context.propertyLink)?._id
  const [name, setName] = useLayerValue('name', context?.propertyLink)
  const [required, setRequired] = useLayerValue('required', context?.propertyLink)
  const [defaultValue, setDefaultValue] = useLayerValue('defaultValue', context?.propertyLink)
  const [definition, setDefinition] = useLayerValue('definition', context?.propertyLink)

  const handleCreateDefinition = type => {
    const propertyLink = createProperty({ type, name: `${name} Definition`, parent: context?.propertyLink })
    setDefinition(propertyLink)
  }

  return (
    <div className={cn(styles.root, className)}>
      <PropertyContentArray
        id={id}
        manager={documentManager}
        name={{
          value: name,
          onChange: v => setName(v, { replace: true })
        }}
        defaultValue={{
          value: defaultValue,
          onChange: nextValue => setDefaultValue(nextValue, { replace: true })
        }}
        required={{
          value: required,
          onChange: v => setRequired(v, { replace: true })
        }}
        definitionLink={definition}
        onSelectSchema={handleCreateDefinition}
      />
    </div>
  )
}
