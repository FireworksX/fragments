import { builderNodes } from '../defenitions'
import { generateId } from '@fragments/utils'

export interface CreateScreenOptions {
  width: number
  name?: string
}

export const createScreen = ({ width, name }: CreateScreenOptions): Entity => ({
  _type: builderNodes.Screen,
  _id: generateId(),
  width,
  name
})
