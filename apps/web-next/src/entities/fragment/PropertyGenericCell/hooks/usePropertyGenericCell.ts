import { entityOfKey, LinkKey } from '@graph-state/core'
import { ElementRef, useContext, useMemo, useRef, useState } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useGraph } from '@graph-state/react'
import { DropdownRenderOption } from '@/shared/ui/RenderDropdown'
import { nextTick } from '@/shared/utils/nextTick'
import { EditPropertyOptions, useFragmentProperties } from '@/shared/hooks/fragmentBuilder/useFragmentProperties'
import { definition } from '@fragmentsx/definition'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { useLayerValue } from '@/shared/hooks/fragmentBuilder/useLayerValue'
import { pick } from '@fragmentsx/utils'

export const usePropertyGenericCell = (propertyLink: LinkKey) => {
  const { createProperty, editProperty, deleteProperty } = useFragmentProperties()
  const { documentManager } = useBuilderDocument()

  const [name] = useLayerValue('name', propertyLink)
  const [propertyType] = useLayerValue('type', propertyLink)
  const [defaultValue] = useLayerValue('defaultValue', propertyLink)
  const isTopLevel = !documentManager.resolve(propertyLink)?.parent

  return {
    type: propertyType as keyof typeof definition.variableType,
    isTopLevel,
    defaultValue,
    remove: () => deleteProperty(propertyLink),
    name: name || entityOfKey(propertyLink)?._id,
    handleClickProperty: (options?: EditPropertyOptions) => {
      editProperty(propertyLink, options)
    }
  }
}
