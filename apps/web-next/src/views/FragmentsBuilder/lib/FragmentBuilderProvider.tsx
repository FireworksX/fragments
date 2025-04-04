import { FC, PropsWithChildren } from 'react'
import { DndContext, MouseSensor, pointerWithin, useSensor, useSensors } from '@dnd-kit/core'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { GraphState } from '@graph-state/core'
import { GlobalManager } from '@fragments/render-react'

interface FragmentBuilderProviderProps extends PropsWithChildren {
  builderManager: GraphState
}

export const FragmentBuilderProvider: FC<FragmentBuilderProviderProps> = ({ builderManager, children }) => {
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 7
      }
    })
  )

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={pointerWithin}
      onDragEnd={builderManager.$droppable.handleDragEnd}
      onDragStart={builderManager.$droppable.handleDragStart}
    >
      <BuilderContext value={{ builderManager }}>{children}</BuilderContext>
    </DndContext>
  )
}
