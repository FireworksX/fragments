import { popoutsStore } from '@/shared/store/popouts.store'
import { cssVariableToLink, linkToCssVariable, objectToColorString } from '@fragmentsx/utils'
import { useLayerPropertyValue } from '@/shared/hooks/fragmentBuilder/useLayerPropertyVariable'
import { useBuilderTextField } from '@/shared/hooks/fragmentBuilder/useBuilderTextField'
import { isVariableLink } from '@fragmentsx/definition'

export const useBuilderTextColor = () => {
  const { value, isMixed, changeValue, resetValue } = useBuilderTextField('color')

  const openColor = () => {
    popoutsStore.open('colorPicker', {
      position: 'right',
      context: {
        value: value ?? '#000',
        onChange: newColor => {
          if (isVariableLink(newColor)) {
            changeValue(linkToCssVariable(newColor))
          } else {
            changeValue(objectToColorString(newColor))
          }
        }
      },
      initial: true
    })
  }

  const colorVariable = useLayerPropertyValue('text.color', {
    fieldValue: cssVariableToLink(value),
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
