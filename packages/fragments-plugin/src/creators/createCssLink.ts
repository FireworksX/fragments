import { builderNodes } from '../index.optimized'
import { generateId } from '@fragments/utils'

export interface CreateCssLinkOptions {
  cssText: string
  name: string
}

export const createCssLink = ({ cssText, name }: CreateCssLinkOptions): Entity => ({
  _type: builderNodes.CssLink,
  _id: generateId(),
  cssText,
  name
})
