import { positionSchema } from '@/shared/data/schemas/styles/positionSchema'
import { sizeSchema } from '@/shared/data/schemas/styles/sizeSchema'
import { sceneSchema } from '@/shared/data/schemas/styles/sceneSchema'
import { z } from '@/shared/data/schemas/zod'

export const instanceStylesSchema = z.object({}).merge(positionSchema).merge(sceneSchema).merge(sizeSchema)
