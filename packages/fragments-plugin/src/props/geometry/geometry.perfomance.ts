import { Border, ImagePaint, Paint, SolidPaint } from 'src/types/props'
import { builderBorderType, builderImagePaintScaleModes, builderPaintMode } from 'src/defenitions'
import { clonedField, Resolver } from 'src/helpers'
import { SpringValue } from '@react-spring/web'
import { isObject } from '@fragments/utils'

export const getDefaultSolidFill = (): SolidPaint => ({
  type: builderPaintMode.Solid,
  color: {
    r: new SpringValue(86),
    g: new SpringValue(196),
    b: new SpringValue(187)
  }
})

export const getDefaultImageFill = (): ImagePaint =>
  ({
    type: builderPaintMode.Image,
    url: undefined,
    scaleMode: builderImagePaintScaleModes.Fill
  } as any)

export const getDefaultBorder = (): Border => ({
  type: builderBorderType.Solid,
  width: new SpringValue(1),
  color: {
    r: new SpringValue(13),
    g: new SpringValue(196),
    b: new SpringValue(45)
  }
})

export const geometryProps: Resolver = (state: any, entity: any) => {
  const entityKey = state.keyOfEntity(entity)

  return {
    ...entity,
    fills: clonedField(state, entity, 'fills'),
    fillType: clonedField(state, entity, 'fillType'),
    border: clonedField(state, entity, 'border'),
    getCurrentFill(): Paint {
      const fills = (state.resolveValue(entityKey, 'fills') ?? []).map(state.resolve)
      const type = state.resolveValue(entityKey, 'fillType')
      return fills?.find?.((f: any) => f.type === type)
    },
    setFillType(type: keyof typeof builderPaintMode) {
      state.mutate(entityKey, {
        fillType: type
      })
    },
    setFill(fill: Paint) {
      state.mutate(
        entityKey,
        () => {
          const resolvedValue = state.resolveValue(entityKey, 'fills')
          const fills = (Array.isArray(resolvedValue) ? [...state.resolveValue(entityKey, 'fills')] : []).map(
            state.resolve
          )
          const prevIndex = fills.findIndex((f: any) => f.type === fill.type)

          if (prevIndex !== -1) {
            fills.splice(prevIndex, 1, fill)
          } else {
            fills.push(fill)
          }

          return {
            fills
          }
        },
        {
          replace: true
        }
      )
    },
    setBorder(border: any) {
      const currentBorder = state.resolve(entityKey).border
      if (currentBorder) {
        if (isObject(border)) {
          Object.entries(border).forEach(([key, value]) => {
            if (key === 'type') {
              state.mutate(entityKey, {
                border: {
                  type: value
                }
              })
            } else if (key === 'color') {
              Object.entries(value).forEach(([colorKey, colorValue]) => {
                if (colorKey in currentBorder.color) {
                  currentBorder.color[colorKey].start(colorValue)
                }
              })
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
