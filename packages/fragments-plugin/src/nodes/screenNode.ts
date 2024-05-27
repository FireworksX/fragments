import { ScreenNode } from 'src/types/nodes'
import { builderNodes, builderSizing } from 'src/defenitions'
import { keyOfEntity, Statex } from '@adstore/statex'
import { pipeResolvers } from 'src/helpers'
import { basePropsResolver } from 'src/propsResolvers/basePropsResolver'
import { childrenPropsResolver } from 'src/propsResolvers/childrenPropsResolver'
import { geometryPropsResolver } from 'src/propsResolvers/geometryPropsResolver'
import { clonePropsResolver } from 'src/propsResolvers/clonePropsResolver'
import { layerPropsResolver } from 'src/propsResolvers/layerPropsResolver'
import { layoutPropsResolver } from 'src/propsResolvers/layoutPropsResolver'
import { paddingPropsResolver } from 'src/propsResolvers/paddingPropsResolver'
import { scenePropsResolver } from 'src/propsResolvers/scenePropsResolver'
import { GraphState } from '@graph-state/core'

export const screenNode = (graphState: GraphState, initialEntity?: ScreenNode): ScreenNode => {
  const key = keyOfEntity(initialEntity) ?? ''

  const initialNode = {
    ...initialEntity,
    background: [],
    setPrimary: () => {
      const primaryScreen = graphState
        .inspectFields(builderNodes.Screen)
        .map(graphState.resolve)
        .find(s => s.isPrimary)

      graphState.mutate(key, {
        isPrimary: true
      })

      if (primaryScreen) {
        graphState.mutate(keyOfEntity(primaryScreen), {
          isPrimary: false
        })
      }
    }
  }

  const resolvedNode = pipeResolvers(
    basePropsResolver,
    childrenPropsResolver,
    geometryPropsResolver,
    layerPropsResolver,
    layoutPropsResolver,
    paddingPropsResolver,
    scenePropsResolver,
    clonePropsResolver
  )(initialNode, graphState)

  return {
    ...resolvedNode,
    isPrimary: initialEntity?.isPrimary ?? false,
    width: initialEntity?.width ?? 320,
    layoutSizingVertical: builderSizing.Hug
  }
}
