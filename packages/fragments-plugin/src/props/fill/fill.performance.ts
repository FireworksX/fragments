import { Border, ImagePaint, Paint, SolidPaint } from 'src/types/props'
import { builderBorderType, builderImagePaintScaleModes, builderNodes, builderPaintMode } from 'src/defenitions'
import { Resolver } from 'src/helpers'
import { SpringValue } from '@react-spring/web'
import { generateId, isObject } from '@fragments/utils'
import { GraphState, isGraphOrKey } from '@graph-state/core'
import { clonedField } from '../../utils/cloneField/cloneField.performance'

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

export const createSolidPaint = (state: GraphState) => {
  const id = generateId()
  const key = state.keyOfEntity({ _type: builderNodes.Fill, _id: id })

  return {
    _type: builderNodes.Fill,
    _id: id,
    type: builderPaintMode.Solid,
    color: {
      r: new SpringValue(86),
      g: new SpringValue(196),
      b: new SpringValue(187),
      a: new SpringValue(1)
    },
    toJSON() {
      const current = state.resolve(key)
      return {
        ...current,
        color: Object.entries(current.color).reduce((acc, [key, value]) => {
          acc[key] = value?.toJSON?.() ?? value
          return acc
        }, {})
      }
    },
    update(color) {
      const currentColor = state.resolve(key).color
      Object.entries(color).forEach(
        ([key, value]) => currentColor[key] instanceof SpringValue && currentColor[key].set(value)
      ) // TODO: add validation for color
    },
    clone() {
      const currentColor = state.resolve(key).toJSON().color
      const nextSolidPaint = createSolidPaint(state)
      state.mutate(nextSolidPaint)
      nextSolidPaint.update(currentColor)

      return nextSolidPaint
    }
  }
}

export const createImagePaint = (state: GraphState) => {
  const id = generateId()
  const key = state.keyOfEntity({ _type: builderNodes.ImageFill, _id: id })

  return {
    _type: builderNodes.ImageFill,
    _id: id,
    type: builderPaintMode.Image,
    url: null,
    update(imageEntity: ImagePaint) {
      state.mutate(key, imageEntity)
    },
    reset() {
      state.mutate(key, { url: null })
    },
    clone() {}
  }
}

export const fillProps: Resolver = (state, entity: any) => {
  const entityKey = state.keyOfEntity(entity)

  return {
    ...entity,
    fills: clonedField(state, entity, 'fills', {
      [builderPaintMode.Solid]: null,
      [builderPaintMode.Image]: null
    }),
    fillType: clonedField(state, entity, 'fillType'),
    getCurrentFill(): Paint {
      const fills = state.resolveValue(entityKey, 'fills')
      const type = state.resolveValue(entityKey, 'fillType')
      return state.resolve(fills?.[type])
    },
    setFillType(type: keyof typeof builderPaintMode) {
      state.mutate(entityKey, {
        fillType: type
      })
    },
    setImageFill(image: Partial<ImagePaint>) {
      if (isGraphOrKey(image)) {
        state.mutate(entityKey, {
          fills: {
            [builderPaintMode.Image]: image
          }
        })
      } else {
        const node = state.resolve(entityKey)
        const currentValue = state.resolve(node.fills[builderPaintMode.Image])

        if (currentValue && image && currentValue._type === builderNodes.ImageFill) {
          currentValue.update(image)
        } else {
          state.mutate(entityKey, {
            fills: {
              [builderPaintMode.Image]: createImagePaint(state)
            }
          })
        }
      }
    },
    setSolidFill(color: SolidPaint['color']) {
      if (isGraphOrKey(color)) {
        state.mutate(entityKey, {
          fills: {
            [builderPaintMode.Solid]: color
          }
        })
      } else {
        const node = state.resolve(entityKey)
        const currentValue = state.resolve(node.fills[builderPaintMode.Solid])

        if (currentValue && color && currentValue._type === builderNodes.Fill) {
          currentValue.update(color)
        } else {
          node.setDefaultSolidFill()
        }
      }
    },
    setDefaultSolidFill() {
      const currentValue = state.resolve(entityKey).fills[builderPaintMode.Solid]

      // if (!currentValue) {
      state.mutate(entityKey, {
        fills: {
          [builderPaintMode.Solid]: createSolidPaint(state)
        }
      })
      // }
    },
    setFill(fill: Paint) {
      const currentFills = state.resolve(entityKey).fills

      // state.mutate(
      //   entityKey,
      //   () => {
      //     const resolvedValue = state.resolveValue(entityKey, 'fills')
      //     const fills = (Array.isArray(resolvedValue) ? [...state.resolveValue(entityKey, 'fills')] : []).map(
      //       state.resolve
      //     )
      //     const prevIndex = fills.findIndex((f: any) => f.type === fill.type)
      //
      //     if (prevIndex !== -1) {
      //       fills.splice(prevIndex, 1, fill)
      //     } else {
      //       fills.push(fill)
      //     }
      //
      //     return {
      //       fills
      //     }
      //   },
      //   {
      //     replace: true
      //   }
      // )
    }
  }
}
