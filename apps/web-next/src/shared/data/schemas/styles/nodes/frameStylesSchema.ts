import { positionSchema } from '@/shared/data/schemas/styles/positionSchema'
import { sizeSchema } from '@/shared/data/schemas/styles/sizeSchema'
import { sceneSchema } from '@/shared/data/schemas/styles/sceneSchema'
import { layerSchema } from '@/shared/data/schemas/styles/layerSchema'
import { fillSchema } from '@/shared/data/schemas/styles/fillSchema'
import { borderSchema } from '@/shared/data/schemas/styles/borderSchema'
import { z } from '@/shared/data/schemas/zod'

export const frameStylesSchema = z
  .object({})
  .merge(positionSchema)
  .merge(sceneSchema)
  .merge(fillSchema)
  .merge(borderSchema)
  .merge(layerSchema)
  .merge(sizeSchema)
