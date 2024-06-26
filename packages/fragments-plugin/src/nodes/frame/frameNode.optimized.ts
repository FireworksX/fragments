import { FrameNode } from '../types/nodes'
import { pipeResolvers, ResolverNode } from '../helpers'
import { basePropsResolver } from '../propsResolvers/basePropsResolver'
import { childrenPropsResolver } from '../propsResolvers/childrenPropsResolver'
import { geometryPropsResolver } from '../propsResolvers/geometryPropsResolver'
import { clonePropsResolver } from '../propsResolvers/clonePropsResolver'
import { layerPropsResolver } from '../propsResolvers/layerPropsResolver'
import { layoutPropsResolver } from '../propsResolvers/layoutPropsResolver'
import { paddingPropsResolver } from '../propsResolvers/paddingPropsResolver'
import { scenePropsResolver } from '../propsResolvers/scenePropsResolver'
import { cssPropsResolver } from '../propsResolvers/cssPropsResolver'
import { effectsPropsResolver } from '../propsResolvers/effectsPropsResolver'
import { cornerPropsResolver } from '../propsResolvers/cornerPropsResolver'
import { hyperlinkPropsResolver } from '../propsResolvers/hyperlinkPropsResolver'

export const frameNode: ResolverNode = (state, initialEntity?: FrameNode): FrameNode => {
  return pipeResolvers(
    basePropsResolver,
    childrenPropsResolver,
    geometryPropsResolver,
    layerPropsResolver,
    layoutPropsResolver,
    paddingPropsResolver,
    scenePropsResolver,
    cssPropsResolver,
    effectsPropsResolver,
    cornerPropsResolver,
    hyperlinkPropsResolver,
    clonePropsResolver
  )(initialEntity, state)
}
