import { definition } from '@fragments/render'
import { z, layerField } from '@/shared/data/schemas/zod'

export const borderSchema = z.object({
  borderType: layerField(z.enum(Object.keys(definition.borderType)), {
    fallback: definition.borderType.None
  }),
  borderWidth: layerField(z.number().nonnegative(), { fallback: 0 }),
  borderColor: layerField(z.string(), { fallback: '#fff' })
})
