import { z, layerField } from '@/shared/data/schemas/zod'
import { frameStylesSchema } from '@/shared/data/schemas/styles/nodes/frameStylesSchema'
import { childrenSchema } from '@/shared/data/schemas/childrenSchema'
import { graphFieldSchema } from '@/shared/data/schemas/graphFieldSchema'
import { overridesSchema } from '@/shared/data/schemas/overridesSchema'

export const frameSchema = z
  .object({
    name: layerField(z.string(), { fallback: 'Frame', overridable: false }),
    isBreakpoint: layerField(z.boolean(), {
      fallback: false,
      overridable: false
    }),
    isPrimary: layerField(z.boolean(), { fallback: false, overridable: false }),
    threshold: layerField(z.number().nonnegative(), {
      fallback: 320,
      overridable: false
    })
  })
  .merge(graphFieldSchema)
  .merge(frameStylesSchema)
  .merge(overridesSchema)
  .merge(childrenSchema)
