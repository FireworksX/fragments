import { LinkKey } from '@graph-state/core'
import { ElementRef, useContext, useMemo, useRef, useState } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useGraph } from '@graph-state/react'
import { DropdownRenderOption } from '@/shared/ui/RenderDropdown'
import { nextTick } from '@/shared/utils/nextTick'
import { useFragmentProperties } from '@/shared/hooks/fragmentBuilder/useFragmentProperties'
import { definition } from '@fragmentsx/definition'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { useLayerValue } from '@/shared/hooks/fragmentBuilder/useLayerValue'
import { pick } from '@fragmentsx/utils'

export const usePropertyGenericCell = (propertyLink: LinkKey) => {
  const { createProperty, editProperty, deleteProperty } = useFragmentProperties()
  const { documentManager } = useBuilderDocument()

  const [name] = useLayerValue('name', propertyLink)
  const [propertyType] = useLayerValue('type', propertyLink)

  const [creating, setCreating] = useState(false)
  const creatingInputRef = useRef<ElementRef<'input'>>(null)
  const creatingButtonRef = useRef<ElementRef<'button'>>(null)
  const [creatingName, setCreatingName] = useState('')
  const creatingType = useRef<any>()
  const [isOpen, setIsOpen] = useState(propertyType !== definition.variableType.Object)

  const handleShowNameSection = type => {
    creatingType.current = type
    setCreating(true)
    nextTick(() => {
      if (creatingInputRef.current) {
        creatingInputRef.current.focus()
      }
    })
  }

  const dropdownActions = useMemo(() => {
    const options: DropdownRenderOption[] = [
      {
        label: 'Remove',
        mode: 'danger',
        onClick: () => deleteProperty(propertyLink)
      }
    ]
    //
    // if (property?.type === variableType.Object) {
    //   options.unshift({
    //     label: 'Add field',
    //     options: [
    //       Object.values(variableType).map(type => {
    //         if (type === variableType.Array) {
    //           return {
    //             label: type,
    //             options: [
    //               Object.values(variableType)
    //                 .filter(t => t !== variableType.Array)
    //                 .map(subType => ({ label: subType, onClick: () => handleShowNameSection(subType) }))
    //             ]
    //           }
    //         }
    //
    //         return {
    //           label: type,
    //           onClick: () => handleShowNameSection(type)
    //         }
    //       })
    //     ]
    //   })
    // }

    return options
  }, [propertyType])

  const resetCreating = event => {
    if (event?.relatedTarget === creatingButtonRef.current) {
      return
    }
    setCreating(false)
    setCreatingName('')
    creatingType.current = null
  }

  const addObjectField = () => {
    // if ('setField' in property) {
    //   const newProperty = createNode(
    //     { _type: nodes.Variable, type: creatingType.current, name: creatingName },
    //     documentManager
    //   )
    //   property.setField(creatingName, newProperty)
    //   setIsOpen(true)
    // }
  }

  const children = useMemo(() => {
    // if (property?.type === variableType.Object) {
    //   return Object.entries(property?.defaultValue ?? {})
    //     .filter(([key]) => key !== '_id' && key !== '_type')
    //     .map(([, v]) => v)
    // }

    return []
  }, [])

  return {
    type: propertyType as keyof typeof definition.variableType,
    withExtend: [definition.variableType.Object, definition.variableType.Array].includes(propertyType),
    name: name || propertyLink,
    creating,
    dropdownActions,
    creatingInputRef,
    creatingButtonRef,
    handleCancelAdd: resetCreating,
    handleAdd: () => {
      addObjectField()
      resetCreating()
    },
    creatingName,
    setCreatingName,
    children,
    isOpen,
    toggleIsOpen: () => setIsOpen(p => !p),
    handleClickProperty: () => {
      editProperty(propertyLink)
    }
  }
}
