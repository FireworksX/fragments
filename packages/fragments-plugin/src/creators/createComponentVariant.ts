import { builderNodes } from 'src'
import { generateId } from '../helpers'

export interface CreateComponentOptions {
  isPrimary?: boolean
  name?: string
}

export const createComponentVariant = (options?: CreateComponentOptions): Entity => ({
  _type: builderNodes.ComponentVariant,
  _id: generateId(),
  ...(options ?? {})
})
