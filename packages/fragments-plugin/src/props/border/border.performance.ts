import { Border, Color, ImagePaint, Paint, SolidPaint } from 'src/types/props'
import { builderBorderType, builderImagePaintScaleModes, builderNodes, builderPaintMode } from 'src/defenitions'
import { Resolver } from 'src/helpers'
import { SpringValue } from '@react-spring/web'
import { isObject } from '@fragments/utils'
import { isGraphOrKey, isLinkKey, LinkKey } from '@graph-state/core'
import { clonedField } from 'src/utils/cloneField/cloneField.performance'

export const getDefaultBorder = (): Border => ({
  type: builderBorderType.Solid,
  width: new SpringValue(1),
  color: {
    r: new SpringValue(13),
    g: new SpringValue(196),
    b: new SpringValue(45)
  }
})

const getDefaultBorderColor = (color: Color = {}) => ({
  r: new SpringValue(color.r ?? 13),
  g: new SpringValue(color.g ?? 196),
  b: new SpringValue(color.b ?? 45),
  a: new SpringValue(color.a ?? 1)
})

export const borderProps: Resolver = (state, entity: any) => {
  const entityKey = state.keyOfEntity(entity)

  return {
    ...entity,
    borderType: clonedField(state, entity, 'borderType', builderBorderType.None),
    borderWidth: clonedField(state, entity, 'borderWidth', 1),
    borderColor: clonedField(state, entity, 'borderColor', getDefaultBorderColor()),

    setBorderType(borderType: any) {
      const borderType$ = state.resolve(entityKey).borderType

      if (borderType$) {
        borderType$.set(borderType)
      } else {
        state.mutate(entityKey, {
          borderType: new SpringValue(borderType)
        })
      }
    },

    setBorderWidth(width: number) {
      const borderWidth$ = state.resolve(entityKey).borderWidth
      if (borderWidth$) {
        borderWidth$.set(width)
      } else {
        state.mutate(entityKey, {
          borderWidth: new SpringValue(width)
        })
      }
    },

    setBorderColor(colorOrLink: Color | LinkKey) {
      const linkGraph = state.resolve(colorOrLink)

      if (isLinkKey(colorOrLink)) {
        if (linkGraph && linkGraph._type === builderNodes.SolidPaintStyle) {
          state.mutate(entityKey, {
            borderColor: colorOrLink
          })
        }
      } else {
        const currentBorderColor = state.resolve(entityKey).borderColor
        if (isObject(currentBorderColor) && colorOrLink && !linkGraph) {
          if (isObject(colorOrLink)) {
            Object.entries(colorOrLink).forEach(([key, value]) => {
              if (key in currentBorderColor) {
                currentBorderColor[key].set(value)
              }
            })
          }
        } else {
          state.mutate(entityKey, {
            borderColor: getDefaultBorderColor(colorOrLink)
          })
        }
      }
    },

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
                    currentBorder.color[colorKey].set(colorValue)
                  }
                })
              }
            } else {
              currentBorder[key].set(value)
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
