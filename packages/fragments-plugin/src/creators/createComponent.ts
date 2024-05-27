import { Entity, Statex } from '@adstore/statex'
import { builderNodes } from '../defenitions'
import { generateId } from '../helpers'

export interface CreateComponentOptions {
  name?: string
}

export const createComponent = (statex: Statex, options?: CreateComponentOptions): Entity => ({
  _type: builderNodes.Component,
  _id: generateId(),
  ...(options ?? {})
})
