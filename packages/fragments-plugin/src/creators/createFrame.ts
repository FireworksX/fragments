import { Entity, Statex } from '@adstore/statex'
import { builderNodes } from '../defenitions'
import { generateId } from '../helpers'

export const createFrame = (statex: Statex): Entity => ({
  _type: builderNodes.Frame,
  _id: generateId()
})
