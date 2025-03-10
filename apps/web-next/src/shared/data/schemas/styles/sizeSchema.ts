import { z, layerField } from '@/shared/data/schemas/zod'
import { definition } from '@fragments/render'

export const sizeSchema = z.object({
  widthType: layerField(z.enum(Object.keys(definition.sizing)), {
    fallback: definition.sizing.Fixed
  }),
  heightType: layerField(z.enum(Object.keys(definition.sizing)), {
    fallback: definition.sizing.Fixed
  }),
  width: layerField(z.number().nonnegative(), { fallback: 0 }),
  height: layerField(z.number().nonnegative(), { fallback: 0 }),
  aspectRatio: layerField(z.number(), { fallback: -1 })
})
