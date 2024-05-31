import { generateId } from '../helpers'
import { builderNodes } from 'src'

export const createFrame = (): Entity => ({
  _type: builderNodes.Frame,
  _id: generateId()
})
