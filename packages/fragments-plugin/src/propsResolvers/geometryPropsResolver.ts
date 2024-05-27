import { Border, ImagePaint, Paint, SolidPaint } from 'src/types/props'
import { builderBorderType, builderImagePaintScaleModes, builderPaintMode } from 'src/defenitions'
import { keyOfEntity, Statex } from '@adstore/statex'
import { clonedField, Resolver } from '../helpers'

export const getDefaultSolidFill = (): SolidPaint => ({
  type: builderPaintMode.Solid,
  color: {
    r: 86,
    g: 196,
    b: 187
  }
})

export const getDefaultImageFill = (): ImagePaint => ({
  type: builderPaintMode.Image,
  url: undefined,
  scaleMode: builderImagePaintScaleModes.Fill
})

export const getDefaultBorder = (): Border => ({
  type: builderBorderType.Solid,
  width: 1,
  color: {
    r: 13,
    g: 196,
    b: 45
  }
})

export const geometryPropsResolver: Resolver = (statex: Statex, entity) => {
  const key = keyOfEntity(entity)

  return {
    ...entity,
    fills: clonedField(statex, entity, 'fills'),
    fillType: clonedField(statex, entity, 'fillType'),
    border: clonedField(statex, entity, 'border'),
    getCurrentFill(): Paint {
      const fills = statex.resolveValue(key, 'fills')
      const type = statex.resolveValue(key, 'fillType')

      return fills?.find?.(f => f.type === type)
    },
    setFillType(type: keyof typeof builderPaintMode) {
      statex.mutate(key, {
        fillType: type
      })
    },
    setFill(fill: Paint) {
      statex.mutate(
        key,
        () => {
          const resolvedValue = statex.resolveValue(key, 'fills')
          const fills = Array.isArray(resolvedValue) ? [...statex.resolveValue(key, 'fills')] : []
          const prevIndex = fills.findIndex(f => f.type === fill.type)

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
    setBorder(border) {
      statex.mutate(key, {
        border
      })
    }
  }
}
