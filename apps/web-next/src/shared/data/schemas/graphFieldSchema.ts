import { z } from '@/shared/data/schemas/zod'
import { definition } from '@fragments/render'

export const graphFieldSchema = z.object({
  _id: z.union([z.string(), z.number()]),
  _type: z.enum(Object.keys(definition.nodes))
})
