import { builderNodes } from 'src/index.performance'
import { generateId } from '@fragments/utils'

export const createFrame = (): Entity => ({
  _type: builderNodes.Frame,
  _id: generateId()
})
