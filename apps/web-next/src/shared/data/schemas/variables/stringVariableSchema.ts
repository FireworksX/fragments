import { definition } from '@fragments/render'
import { z, layerField } from '@/shared/data/schemas/zod'
import { graphFieldSchema } from '@/shared/data/schemas/graphFieldSchema'

export const stringVariableSchema = z
  .object({
    name: layerField(z.string(), {
      fallback: 'String',
      overridable: false
    }),
    type: layerField(z.literal(definition.variableType.String), {
      fallback: definition.variableType.String
    }),
    defaultValue: layerField(z.string(), { fallback: '' }),
    required: layerField(z.boolean(), { fallback: false }),
    placeholder: layerField(z.string(), { fallback: '' }),
    isTextarea: layerField(z.boolean(), { fallback: false })
  })
  .merge(graphFieldSchema)
