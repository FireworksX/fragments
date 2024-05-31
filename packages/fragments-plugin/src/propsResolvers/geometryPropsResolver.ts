import { Border, ImagePaint, Paint, SolidPaint } from 'src/types/props'
import { builderBorderType, builderImagePaintScaleModes, builderPaintMode } from 'src/defenitions'
import { clonedField, Resolver } from '../helpers'

export const getDefaultSolidFill = (): SolidPaint => ({
  type: builderPaintMode.Solid,
  color: {
    r: 86,
    g: 196,
    b: 187
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
  width: 1,
  color: {
    r: 13,
    g: 196,
    b: 45
  }
})

export const geometryPropsResolver: Resolver = (state: any, entity: any) => {
  const key = state.keyOfEntity(entity)

  return {
    ...entity,
    fills: clonedField(state, entity, 'fills'),
    fillType: clonedField(state, entity, 'fillType'),
    border: clonedField(state, entity, 'border'),
    getCurrentFill(): Paint {
      const fills = (state.resolveValue(key, 'fills') ?? []).map(state.resolve)
      const type = state.resolveValue(key, 'fillType')
      return fills?.find?.((f: any) => f.type === type)
    },
    setFillType(type: keyof typeof builderPaintMode) {
      state.mutate(key, {
        fillType: type
      })
    },
    setFill(fill: Paint) {
      state.mutate(
        key,
        () => {
          const resolvedValue = state.resolveValue(key, 'fills')
          const fills = (Array.isArray(resolvedValue) ? [...state.resolveValue(key, 'fills')] : []).map(state.resolve)
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
      state.mutate(key, {
        border
      })
    }
  }
}
