import { Entity, Statex } from '@adstore/statex'
import { builderNodes, generateId } from '../../data/promos/creators'

export interface CreateCssLinkOptions {
  cssText: string
  name: string
}

export const createCssLink = (statex: Statex, { cssText, name }: CreateCssLinkOptions): Entity => ({
  _type: builderNodes.CssLink,
  _id: generateId(),
  cssText,
  name
})
