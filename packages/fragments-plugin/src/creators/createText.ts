import { generateId } from '../helpers'
import { builderNodes } from 'src'

export const createText = (): Entity => ({
  _type: builderNodes.Text,
  _id: generateId()
})
