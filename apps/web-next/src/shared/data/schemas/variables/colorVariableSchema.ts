import { z, layerField } from '@/shared/data/schemas/zod'
import { graphFieldSchema } from '@/shared/data/schemas/graphFieldSchema'
import { definition } from '@fragments/render'

export const colorVariableSchema = z
  .object({
    name: layerField(z.string(), {
      fallback: 'String',
      overridable: false
    }),
    type: layerField(z.literal(definition.variableType.Color), {
      fallback: definition.variableType.Color
    }),
    // TODO Add color validator
    defaultValue: layerField(z.string(), { fallback: '#000' }),
    required: layerField(z.boolean(), { fallback: false })
  })
  .merge(graphFieldSchema)
