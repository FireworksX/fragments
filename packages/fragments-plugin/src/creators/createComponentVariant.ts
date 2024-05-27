import { Entity, Statex } from '@adstore/statex'
import { builderNodes, generateId } from '../../data/promos/creators'

export interface CreateComponentOptions {
  isPrimary?: boolean
  name?: string
}

export const createComponentVariant = (statex: Statex, options?: CreateComponentOptions): Entity => ({
  _type: builderNodes.ComponentVariant,
  _id: generateId(),
  ...(options ?? {})
})
