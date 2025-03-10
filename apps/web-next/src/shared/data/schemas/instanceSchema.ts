import { z, layerField } from '@/shared/data/schemas/zod'
import { graphFieldSchema } from '@/shared/data/schemas/graphFieldSchema'
import { overridesSchema } from '@/shared/data/schemas/overridesSchema'
import { instanceStylesSchema } from '@/shared/data/schemas/styles/nodes/instanceStylesSchema'

export const instanceSchema = z
  .object({
    name: layerField(z.string(), { fallback: 'Instance', overridable: false }),
    fragment: layerField(z.string()),
    props: layerField(z.record(z.string(), z.union([z.string(), z.number(), z.boolean()])), {
      fallback: {}
    })
  })
  .merge(graphFieldSchema)
  .merge(instanceStylesSchema)
  .merge(overridesSchema)
