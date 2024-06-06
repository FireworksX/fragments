import { builderNodes } from 'src'
import { generateId } from '@fragments/utils'

export const createFrame = (): Entity => ({
  _type: builderNodes.Frame,
  _id: generateId()
})
