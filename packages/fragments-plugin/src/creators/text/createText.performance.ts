import { builderNodes } from 'src/index.performance'
import { generateId } from '@fragments/utils'

export const createText = (): Entity => ({
  _type: builderNodes.Text,
  _id: generateId()
})
