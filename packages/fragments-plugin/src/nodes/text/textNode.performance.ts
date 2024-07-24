import { TextNode } from 'src/types/nodes'
import { pipeResolvers } from 'src/helpers'
import { baseProps } from 'src/props/base/base.performance'
import { sceneProps } from 'src/props/scene/scene.perfomance'
import { cloneProps } from 'src/props/clone/clone.performance'
import { layoutProps } from 'src/props/layout/layout.perfomance'
import { textContentProps } from 'src/props/textContent/textContent.performance'

export const textNode = (state: any, initialEntity?: TextNode): TextNode => {
  // const key = state.keyOfEntity(initialEntity) ?? ''

  const node = initialEntity

  return pipeResolvers(
    baseProps,
    textContentProps,
    // textContentPropsResolver,
    cloneProps,
    sceneProps,
    // cssPropsResolver,
    // hyperlinkPropsResolver,
    layoutProps
  )(node, state)
}
