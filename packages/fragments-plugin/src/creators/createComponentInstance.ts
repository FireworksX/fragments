import { builderNodes } from 'src/defenitions'
import { EntityKey } from '../types/props'
import { generateId } from '@fragments/utils'

export interface CreateComponentInstanceOptions {
  name?: string
  mainComponent?: EntityKey
  variant?: EntityKey
}

export const createComponentInstance = (options?: CreateComponentInstanceOptions): Entity => ({
  _type: builderNodes.ComponentInstance,
  _id: generateId(),
  ...(options ?? {})
})
