import { z, layerField } from '@/shared/data/schemas/zod'
import { graphFieldSchema } from '@/shared/data/schemas/graphFieldSchema'
import { overridesSchema } from '@/shared/data/schemas/overridesSchema'
import { textStylesSchema } from '@/shared/data/schemas/styles/nodes/textStylesSchema'

export const textSchema = z
  .object({
    name: layerField(z.string(), { fallback: 'Text', overridable: false }),
    content: layerField(z.string(), {
      fallback: ''
    }),
    variableContent: layerField(z.string(), { fallback: null, variable: true }),
    attributes: layerField(
      z.object({
        fontSize: layerField(z.string(), { fallback: '14px' }),
        color: layerField(z.string(), { fallback: '#000' }),
        lineHeight: layerField(z.string(), { fallback: '14px' })
      }),
      { fallback: {} }
    )
  })
  .merge(graphFieldSchema)
  .merge(textStylesSchema)
  .merge(overridesSchema)
