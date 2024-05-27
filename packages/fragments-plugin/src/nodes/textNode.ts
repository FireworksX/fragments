import { TextNode } from '../types/nodes'
import { keyOfEntity, Statex } from '@adstore/statex'
import { pipeResolvers } from '../helpers'
import { basePropsResolver } from '../propsResolvers/basePropsResolver'
import { clonePropsResolver } from '../propsResolvers/clonePropsResolver'
import { scenePropsResolver } from '../propsResolvers/scenePropsResolver'
import { cssPropsResolver } from '../propsResolvers/cssPropsResolver'
import { hyperlinkPropsResolver } from '../propsResolvers/hyperlinkPropsResolver'
import { textContentPropsResolver } from '../propsResolvers/textContentPropsResolver'
import { layoutPropsResolver } from '../propsResolvers/layoutPropsResolver'

export const textNode = (statex: Statex, initialEntity?: TextNode): TextNode => {
  const key = keyOfEntity(initialEntity) ?? ''

  const node = initialEntity

  return pipeResolvers(
    basePropsResolver,
    textContentPropsResolver,
    clonePropsResolver,
    scenePropsResolver,
    cssPropsResolver,
    hyperlinkPropsResolver,
    layoutPropsResolver
  )(node, statex)
}
