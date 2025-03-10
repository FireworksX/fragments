import { layerField, z } from '@/shared/data/schemas/zod'

export const overridesSchema = z.object({
  overrides: layerField(z.array(z.string()), { overridable: false })
})
