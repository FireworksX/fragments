import { builderNodes } from 'src/defenitions'
import { generateId } from '../helpers'
import { EntityKey } from '../types/props'

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
