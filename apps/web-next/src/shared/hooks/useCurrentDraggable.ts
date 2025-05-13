import { useDndMonitor } from '@dnd-kit/core'
import { DragStartEvent } from '@dnd-kit/core/dist/types'
import { useState } from 'react'
import { DragEndEvent } from '@dnd-kit/core/dist/types/events'

export const useCurrentDraggable = (area?: string) => {
  const [event, setEvent] = useState<DragStartEvent | null>(null)

  useDndMonitor({
    onDragStart(event: DragStartEvent) {
      if (area) {
        if (event.active.data.current?.area === area) {
          setEvent(event)
        }
      } else {
        setEvent(event)
      }
    },
    onDragEnd(event: DragEndEvent) {
      setEvent(null)
    }
  })

  return event
}
