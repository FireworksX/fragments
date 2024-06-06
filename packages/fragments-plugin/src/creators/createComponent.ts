import { builderNodes } from 'src'
import { generateId } from '@fragments/utils'

export interface CreateComponentOptions {
  name?: string
}

export const createComponent = (options?: CreateComponentOptions): Entity => ({
  _type: builderNodes.Component,
  _id: generateId(),
  ...(options ?? {})
})
