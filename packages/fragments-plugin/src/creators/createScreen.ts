import { Entity, Statex } from '@adstore/statex'
import { builderNodes } from '../defenitions'
import { generateId } from '../helpers'

export interface CreateScreenOptions {
  width: number
  name?: string
}

export const createScreen = (statex: Statex, { width, name }: CreateScreenOptions): Entity => ({
  _type: builderNodes.Screen,
  _id: generateId(),
  width,
  name
})
