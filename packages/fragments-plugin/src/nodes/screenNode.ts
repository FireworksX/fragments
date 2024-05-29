import { ScreenNode } from 'src/types/nodes'
import { builderNodes, builderSizing } from 'src/defenitions'
import { keyOfEntity, Statex } from '@adstore/statex'
import { pipeResolvers, ResolverNode } from 'src/helpers'
import { basePropsResolver } from 'src/propsResolvers/basePropsResolver'
import { childrenPropsResolver } from 'src/propsResolvers/childrenPropsResolver'
import { geometryPropsResolver } from 'src/propsResolvers/geometryPropsResolver'
import { clonePropsResolver } from 'src/propsResolvers/clonePropsResolver'
import { layerPropsResolver } from 'src/propsResolvers/layerPropsResolver'
import { layoutPropsResolver } from 'src/propsResolvers/layoutPropsResolver'
import { paddingPropsResolver } from 'src/propsResolvers/paddingPropsResolver'
import { scenePropsResolver } from 'src/propsResolvers/scenePropsResolver'
import { GraphState } from '@graph-state/core'

export const screenNode: ResolverNode = (state, initialEntity?: ScreenNode): ScreenNode => {
  const key = keyOfEntity(initialEntity) ?? ''

  const initialNode = {
    ...initialEntity,
    background: [],
    setPrimary: () => {
      const primaryScreen = state
        .inspectFields(builderNodes.Screen)
        .map(state.resolve)
        .find(s => s.isPrimary)

      state.mutate(key, {
        isPrimary: true
      })

      if (primaryScreen) {
        state.mutate(keyOfEntity(primaryScreen), {
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
  )(initialNode, state)

  return {
    ...resolvedNode,
    isPrimary: initialEntity?.isPrimary ?? false,
    width: initialEntity?.width ?? 320,
    layoutSizingVertical: builderSizing.Hug
  }
}
