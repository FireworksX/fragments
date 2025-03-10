import { definition } from '@fragments/render'
import { positionSchema } from '@/shared/data/schemas/styles/positionSchema'
import { sizeSchema } from '@/shared/data/schemas/styles/sizeSchema'
import { sceneSchema } from '@/shared/data/schemas/styles/sceneSchema'
import { layerField, z } from '@/shared/data/schemas/zod'

export const textStylesSchema = z
  .object({
    whiteSpace: layerField(z.enum(Object.keys(definition.whiteSpace)), {
      fallback: definition.whiteSpace.pre
    })
  })
  .merge(positionSchema)
  .merge(sceneSchema)
  .merge(sizeSchema)
