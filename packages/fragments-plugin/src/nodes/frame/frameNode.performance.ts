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
    baseProps,
    sceneProps,
    cornerProps,
    borderProps,
    fillProps,
    layoutProps,
    layerProps,
    paddingProps,
    childrenProps,
    cloneProps
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
