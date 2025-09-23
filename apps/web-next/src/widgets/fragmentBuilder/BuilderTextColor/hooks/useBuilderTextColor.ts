import { useStack } from '@/shared/hooks/useStack'
import { cssVariableToLink, isCssLink, linkToCssVariable, objectToColorString } from '@fragmentsx/utils'
import { useLayerPropertyValue } from '@/shared/hooks/fragmentBuilder/useLayerPropertyVariable'
import { useBuilderTextField } from '@/shared/hooks/fragmentBuilder/useBuilderTextField'
import { isVariableLink } from '@fragmentsx/definition'

export const useBuilderTextColor = () => {
  const { value, isMixed, changeValue, resetValue } = useBuilderTextField('color', { fallback: '#000' })
  const stack = useStack()

  const openColor = () => {
    stack.open(
      'colorPicker',
      {
        value: isCssLink(value) ? cssVariableToLink(value) : value ?? '#000',
        onChange: newColor => {
          if (isVariableLink(newColor)) {
            changeValue(linkToCssVariable(newColor))
          } else {
            changeValue(objectToColorString(newColor))
          }
        }
      },
      {
        position: 'right',
        initial: true
      }
    )
  }

  const colorVariable = useLayerPropertyValue('text.color', {
    fieldValue: cssVariableToLink(value),
    editVariable: options => (options.isProjectVariable ? openColor() : options.editVariable()),
    onSetValue: value => {
      if (value) {
        changeValue(linkToCssVariable(value))
      }
    },
    onResetVariable: () => {
      resetValue()
    }
  })

  return {
    ...colorVariable,
    value,
    isMixed,
    onClick: openColor
  }
}
