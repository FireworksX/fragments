import { LinkKey, Plugin } from '@graph-state/core'
import { SpringValue } from '@react-spring/web'
import { findRefNode } from '@/shared/utils/findRefNode'
import type { DragStartEvent } from '@dnd-kit/core/dist/types'
import { DragEndEvent } from '@dnd-kit/core/dist/types/events'

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

  const droppableGraphKey = state.keyOfEntity(droppableGraph)
  const canvasDroppableGraphKey = state.keyOfEntity(canvasDroppableGraph)
  state.droppableKey = droppableGraphKey
  state.canvasDroppableKey = canvasDroppableGraphKey

  state.mutate(state.key, {
    droppable: droppableGraph,
    canvasDroppable: canvasDroppableGraph
  })

  state.$droppable = {
    handleDragStart(e: DragStartEvent) {
      const active = e.active

      state.mutate(droppableGraphKey, {
        activeDraggable: active ?? null
      })
    },

    handleDragEnd(e: DragEndEvent) {
      const over = e.over

      state.mutate(droppableGraphKey, {
        activeDraggable: null
      })

      if (over?.data?.current?.area === 'canvas') {
        state.mutate(canvasDroppableGraphKey, {
          active: e.active.data?.current,
          over: e.over?.data?.current
        })
      }
    }
  }
}
