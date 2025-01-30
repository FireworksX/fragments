import { LinkKey, Plugin } from '@graph-state/core'
import { SpringValue } from '@react-spring/web'
import { findRefNode } from '@/shared/utils/findRefNode'
import type { DragStartEvent } from '@dnd-kit/core/dist/types'
import { DragEndEvent } from '@dnd-kit/core/dist/types/events'
import { createConstants } from '@fragments/utils'

export const draggableTypes = createConstants('fragmentProjectItem')

// TODO: Refactoring
export const droppablePlugin: Plugin = state => {
  const droppableGraph = {
    _type: 'Droppable',
    _id: 'root',
    activeDraggable: null
  }

  const canvasDroppableGraph = {
    _type: 'Droppable',
    _id: 'canvas',
    active: null,
    over: null
  }

  const builderPlaceholderDroppableGraph = {
    _type: 'Droppable',
    _id: 'builderPlaceholder',
    active: null,
    over: null
  }

  const droppableGraphKey = state.keyOfEntity(droppableGraph)
  const canvasDroppableGraphKey = state.keyOfEntity(canvasDroppableGraph)
  const builderPlaceholderDroppableGraphKey = state.keyOfEntity(builderPlaceholderDroppableGraph)
  state.droppableKey = droppableGraphKey
  state.canvasDroppableKey = canvasDroppableGraphKey

  state.mutate(state.key, {
    droppable: droppableGraph,
    canvasDroppable: canvasDroppableGraph,
    builderPlaceholderDroppable: builderPlaceholderDroppableGraphKey
  })

  state.$droppable = {
    droppableKey: droppableGraphKey,
    canvasDroppableKey: canvasDroppableGraphKey,
    builderPlaceholderDroppableKey: builderPlaceholderDroppableGraphKey,
    handleDragStart(e: DragStartEvent) {
      const active = e.active

      state.mutate(droppableGraphKey, {
        activeDraggable: active ?? null
      })
    },

    handleDragEnd(e: DragEndEvent) {
      const over = e.over

      console.log(e)

      state.mutate(droppableGraphKey, {
        activeDraggable: null
      })

      if (over?.data?.current?.area === 'canvas') {
        state.mutate(canvasDroppableGraphKey, {
          active: e.active.data?.current,
          over: e.over?.data?.current
        })
      }

      if (over?.data?.current?.area === 'canvas') {
        state.mutate(canvasDroppableGraphKey, {
          active: e.active.data?.current,
          over: e.over?.data?.current
        })
      }

      if (over?.data?.current?.area === 'builderPlaceholder') {
        state.mutate(builderPlaceholderDroppableGraphKey, {
          active: e.active.data?.current,
          over: e.over?.data?.current
        })
      }
    }
  }
}
