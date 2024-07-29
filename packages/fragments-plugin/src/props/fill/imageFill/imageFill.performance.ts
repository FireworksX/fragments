import { Resolver } from '../../../helpers'
import { clonedField } from '../../../utils/cloneField/cloneField.performance'
import { builderImagePaintScaleModes } from 'src'

export const imageFillProps: Resolver = (state, graph) => {
  const setImageFill = (url: string) => {
    const imageFill$ = state.resolve(graph).imageFill

    if (imageFill$) {
      imageFill$.set(url)
    } else {
      state.mutate(state.keyOfEntity(graph), {
        imageFill: url
      })
    }
  }
  const setImageFillScaleMode = (mode: keyof typeof builderImagePaintScaleModes) => {
    const imageFillScaleMode$ = state.resolve(graph).imageFillScaleMode

    if (imageFillScaleMode$) {
      imageFillScaleMode$.set(mode)
    } else {
      state.mutate(state.keyOfEntity(graph), {
        imageFillScaleMode: mode
      })
    }
  }

  return {
    imageFill: clonedField(state, graph, 'imageFill'),
    imageFillScaleMode: clonedField(state, graph, 'imageFillScaleMode'),
    setImageFill,
    setImageFillScaleMode
  }
}
