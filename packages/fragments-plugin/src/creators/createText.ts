import { builderNodes } from '../index.optimized'
import { generateId } from '@fragments/utils'

export const createText = (): Entity => ({
  _type: builderNodes.Text,
  _id: generateId()
})
