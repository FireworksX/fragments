import { builderNodes } from '../index.optimized'
import { generateId } from '@fragments/utils'

export interface CreateComponentOptions {
  isPrimary?: boolean
  name?: string
}

export const createComponentVariant = (options?: CreateComponentOptions): Entity => ({
  _type: builderNodes.ComponentVariant,
  _id: generateId(),
  ...(options ?? {})
})
