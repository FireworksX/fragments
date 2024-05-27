import { Entity, Statex } from '@adstore/statex'
import { builderNodes } from '../defenitions'
import { generateId } from '../helpers'

export const createText = (statex: Statex): Entity => ({
  _type: builderNodes.Text,
  _id: generateId()
})
