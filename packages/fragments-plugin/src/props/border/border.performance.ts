import { Border, ImagePaint, Paint, SolidPaint } from 'src/types/props'
import { builderBorderType, builderImagePaintScaleModes, builderPaintMode } from 'src/defenitions'
import { clonedField, Resolver } from 'src/helpers'
import { SpringValue } from '@react-spring/web'
import { isObject } from '@fragments/utils'
import { isGraphOrKey } from '@graph-state/core'

export const getDefaultBorder = (): Border => ({
  type: builderBorderType.Solid,
  width: new SpringValue(1),
  color: {
    r: new SpringValue(13),
    g: new SpringValue(196),
    b: new SpringValue(45)
  }
})

export const borderProps: Resolver = (state, entity: any) => {
  const entityKey = state.keyOfEntity(entity)

  return {
    ...entity,
    border: clonedField(state, entity, 'border'),
    setBorder(border: any) {
      const currentBorder = state.resolve(entityKey).border
      if (currentBorder && border) {
        if (isObject(border)) {
          Object.entries(border).forEach(([key, value]) => {
            if (key === 'type') {
              state.mutate(entityKey, {
                border: {
                  type: value
                }
              })
            } else if (key === 'color') {
              if (isGraphOrKey(border.color)) {
                state.mutate(entityKey, {
                  border: {
                    color: border.color
                  }
                })
              } else {
                Object.entries(value).forEach(([colorKey, colorValue]) => {
                  if (colorKey in currentBorder.color) {
                    currentBorder.color[colorKey].start(colorValue)
                  }
                })
              }
            } else {
              currentBorder[key].start(value)
            }
          })
        }
      } else {
        state.mutate(entityKey, {
          border
        })
      }
    }
  }
}
