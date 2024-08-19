import { FrameNode } from '../types/nodes'
import { pipeResolvers, ResolverNode } from 'src/helpers'
import { baseProps } from 'src/props/base/base.performance'
import { sceneProps } from 'src/props/scene/scene.perfomance'
import { cornerProps } from 'src/props/corner/corner.perfomance'
import { borderProps } from 'src/props/border/border.performance'
import { fillProps } from 'src/props/fill/fill.performance'
import { layoutProps } from 'src/props/layout/layout.perfomance'
import { layerProps } from 'src/props/layer/layer.performance'
import { paddingProps } from 'src/props/padding/padding.performance'
import { childrenProps } from 'src/props/children/children.performance'
import { cloneProps } from 'src/props/clone/clone.performance'
import { cssOverride } from 'src/props/cssOverride/cssOverride.performance'

export const frameNode: ResolverNode = (state, initialEntity?: FrameNode): FrameNode => {
  return pipeResolvers(
    baseProps,
    sceneProps,
    cornerProps,
    borderProps,
    fillProps,
    layoutProps,
    layerProps,
    paddingProps,
    childrenProps,
    cloneProps,
    cssOverride
  )(initialEntity, state)
}
