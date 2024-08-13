import { ScreenNode } from 'src/types/nodes'
import { builderNodes, builderSizing } from 'src/defenitions'
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

export const breakpointNode: ResolverNode = (state, initialEntity?: ScreenNode): ScreenNode => {
  const key = state.keyOfEntity(initialEntity) ?? ''

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
        state.mutate(state.keyOfEntity(primaryScreen), {
          isPrimary: false
        })
      }
    }
  }

  const resolvedNode = pipeResolvers(
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
  )(
    {
      ...initialNode,
      isPrimary: initialEntity?.isPrimary ?? false,
      width: initialEntity?.width ?? 320,
      layoutSizingVertical: initialEntity?.layoutSizingVertical ?? builderSizing.Hug,
      layoutSizingHorizontal: initialEntity?.layoutSizingHorizontal ?? builderSizing.Fill
    },
    state
  )

  return {
    ...resolvedNode
  }
}
