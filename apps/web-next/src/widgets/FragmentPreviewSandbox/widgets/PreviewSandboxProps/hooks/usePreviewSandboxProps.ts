import { useFragmentProperties, useFragmentManager } from '@fragments/render-react'
import { useState } from 'react'

export const usePreviewSandboxProps = (fragmentId: number, props, onChange) => {
  const fragmentDefinition = useFragmentProperties(fragmentId)
  const { manager: fragmentManager } = useFragmentManager(fragmentId)

  return {
    definitions: fragmentDefinition.map(definition => {
      const { _id, defaultValue } = fragmentManager?.resolve?.(definition) ?? {}

      return {
        link: definition,
        value: _id in props ? props[_id] : defaultValue,
        setValue: value => onChange({ ...props, [_id]: value })
      }
    }),
    manager: fragmentManager
  }
}
