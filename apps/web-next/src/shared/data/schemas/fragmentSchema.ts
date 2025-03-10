import { z, layerField } from '@/shared/data/schemas/zod'
import { graphFieldSchema } from '@/shared/data/schemas/graphFieldSchema'
import { childrenSchema } from '@/shared/data/schemas/childrenSchema'
import { definition } from '@fragments/render'

export const fragmentSchema = z
  .object({
    name: layerField(z.string(), { fallback: 'Fragment', overridable: false }),
    horizontalGrow: layerField(z.enum(Object.keys(definition.fragmentGrowingMode)), {
      fallback: definition.fragmentGrowingMode.auto,
      overridable: false
    }),
    verticalGrow: layerField(z.enum(Object.keys(definition.fragmentGrowingMode)), {
      fallback: definition.fragmentGrowingMode.auto,
      overridable: false
    }),
    properties: layerField(z.array(z.string()), {
      fallback: [],
      overridable: false
    })
  })
  .merge(graphFieldSchema)
  .merge(childrenSchema)
