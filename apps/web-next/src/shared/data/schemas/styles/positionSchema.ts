import { z, layerField } from '@/shared/data/schemas/zod'
import { definition } from '@fragments/render'

export const positionSchema = z.object({
  position: layerField(z.enum(Object.keys(definition.positionType)), {
    fallback: definition.positionType.absolute
  }),
  top: layerField(z.number().nullable(), { fallback: 0 }),
  left: layerField(z.number().nullable(), { fallback: 0 })
})
