import { z, layerField } from '@/shared/data/schemas/zod'
import { definition } from '@fragments/render'

export const sceneSchema = z.object({
  opacity: layerField(z.number().nonnegative().max(1), {
    fallback: 1,
    variable: true
  }),
  visible: layerField(z.boolean(), { fallback: true, variable: true }),
  zIndex: layerField(z.number(), { fallback: -1 }),
  borderRadius: layerField(z.string(), { fallback: '0px' }),
  overflow: layerField(z.enum(Object.keys(definition.overflow)), {
    fallback: definition.overflow.hidden
  })
})
