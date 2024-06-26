import { FrameNode } from '../types/nodes'
import { pipeResolvers, ResolverNode } from 'src/helpers'
import { sceneProps } from 'src/props/scene/scene.perfomance'
import { cornerProps } from 'src/props/corner/corner.perfomance'
import { geometryProps } from 'src/props/geometry/geometry.perfomance'
import { layoutProps } from 'src/props/layout/layout.perfomance'
import { layerProps } from 'src/props/layer/layer.performance'
// import { basePropsResolver } from '../propsResolvers/basePropsResolver'
// import { childrenPropsResolver } from '../propsResolvers/childrenPropsResolver'
// import { geometryPropsResolver } from '../propsResolvers/geometryPropsResolver'
// import { clonePropsResolver } from '../propsResolvers/clonePropsResolver'
// import { layerPropsResolver } from '../propsResolvers/layerPropsResolver'
// import { layoutPropsResolver } from '../propsResolvers/layoutPropsResolver'
// import { paddingPropsResolver } from '../propsResolvers/paddingPropsResolver'
// import { scenePropsResolver } from '../propsResolvers/scenePropsResolver'
// import { cssPropsResolver } from '../propsResolvers/cssPropsResolver'
// import { effectsPropsResolver } from '../propsResolvers/effectsPropsResolver'
// import { cornerPropsResolver } from '../propsResolvers/cornerPropsResolver'
// import { hyperlinkPropsResolver } from '../propsResolvers/hyperlinkPropsResolver'

export const frameNode: ResolverNode = (state, initialEntity?: FrameNode): FrameNode => {
  return pipeResolvers(
    sceneProps,
    cornerProps,
    geometryProps,
    layoutProps,
    layerProps
    // basePropsResolver,
    // childrenPropsResolver,
    // geometryPropsResolver,
    // layerPropsResolver,
    // layoutPropsResolver,
    // paddingPropsResolver,
    // scenePropsResolver,
    // cssPropsResolver,
    // effectsPropsResolver,
    // cornerPropsResolver,
    // hyperlinkPropsResolver,
    // clonePropsResolver
  )(initialEntity, state)
}
