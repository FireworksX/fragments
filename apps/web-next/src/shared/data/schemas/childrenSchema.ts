import { z, layerField } from '@/shared/data/schemas/zod'

export const childrenSchema = z.object({
  children: layerField(z.array(z.string()), {
    fallback: [],
    overridable: false
  })
})
