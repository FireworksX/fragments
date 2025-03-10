import { z, layerField } from '@/shared/data/schemas/zod'
import { definition } from '@fragments/render'

export const layerSchema = z.object({
  layerMode: layerField(z.enum(Object.keys(definition.layerMode)), {
    fallback: definition.layerMode.none
  }),
  layerAlign: layerField(z.enum(Object.keys(definition.layerAlign)), {
    fallback: definition.layerAlign.start
  }),
  layerDirection: layerField(z.enum(Object.keys(definition.layerDirection)), {
    fallback: definition.layerDirection.horizontal
  }),
  layerDistribute: layerField(z.enum(Object.keys(definition.layerDistribute)), {
    fallback: definition.layerDistribute.start
  }),
  layerWrap: layerField(z.boolean(), { fallback: false }),
  layerGap: layerField(z.number().nonnegative(), { fallback: 0 }),

  padding: layerField(z.string(), { fallback: '0px' })
})
