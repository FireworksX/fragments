import { generateId } from '../helpers'
import { builderNodes } from 'src'

export interface CreateComponentOptions {
  name?: string
}

export const createComponent = (options?: CreateComponentOptions): Entity => ({
  _type: builderNodes.Component,
  _id: generateId(),
  ...(options ?? {})
})
