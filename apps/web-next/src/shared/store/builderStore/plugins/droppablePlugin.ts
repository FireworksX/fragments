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
  const droppableGraphKey = state.keyOfEntity(droppableGraph)
  state.droppableKey = droppableGraphKey
  const onDropListeners = []

  state.mutate(state.key, {
    droppable: droppableGraph
  })

  state.$droppable = {
    onDrop(callback) {
      onDropListeners.push(callback)
      // TODO Add unsubscribe
    },

    handleDragStart(e: DragStartEvent) {
      const active = e.active

      state.mutate(droppableGraphKey, {
        activeDraggable: active ?? null
      })
    },

    handleDragEnd(e: DragEndEvent) {
      const over = e.over

      onDropListeners.forEach(cb => cb({ over }))

      state.mutate(droppableGraphKey, {
        activeDraggable: null
      })
    }
  }
}
