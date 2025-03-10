import { definition } from '@fragments/render'
import { z, layerField } from '@/shared/data/schemas/zod'
import { graphFieldSchema } from '@/shared/data/schemas/graphFieldSchema'

export const numberVariableSchema = z
  .object({
    name: layerField(z.string(), {
      fallback: 'Number',
      overridable: false
    }),
    type: layerField(z.literal(definition.variableType.Number), {
      fallback: definition.variableType.Number
    }),
    defaultValue: layerField(z.number(), { fallback: 0 }),
    required: layerField(z.boolean(), { fallback: false }),
    min: layerField(z.number(), { fallback: 1 }),
    max: layerField(z.number(), { fallback: 100 }),
    step: layerField(z.number(), { fallback: 1 }),
    displayStepper: layerField(z.boolean(), { fallback: true })
  })
  .merge(graphFieldSchema)
