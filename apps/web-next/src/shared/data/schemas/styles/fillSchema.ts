import { definition } from '@fragments/render'
import { z, layerField } from '@/shared/data/schemas/zod'

export const fillSchema = z.object({
  fillType: layerField(z.enum(Object.keys(definition.paintMode)), {
    fallback: definition.paintMode.None
  }),
  solidFill: layerField(z.string(), { fallback: '#fff' })
})
