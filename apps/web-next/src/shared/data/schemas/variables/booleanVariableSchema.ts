import { z, layerField } from '@/shared/data/schemas/zod'
import { graphFieldSchema } from '@/shared/data/schemas/graphFieldSchema'
import { variableType } from '@fragments/plugin-fragment'

export const booleanVariableSchema = z
  .object({
    name: layerField(z.string(), {
      fallback: 'Boolean',
      overridable: false
    }),
    type: layerField(z.literal(variableType.Boolean), {
      fallback: variableType.Boolean
    }),
    defaultValue: layerField(z.boolean(), { fallback: false }),
    required: layerField(z.boolean(), { fallback: false })
  })
  .merge(graphFieldSchema)
