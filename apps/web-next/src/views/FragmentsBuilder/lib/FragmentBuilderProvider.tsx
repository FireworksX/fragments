import { FC, PropsWithChildren } from 'react'
import { DndContext, MouseSensor, pointerWithin, useSensor, useSensors } from '@dnd-kit/core'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { GraphState } from '@graph-state/core'
import { GlobalManager } from '@fragments/render-react'

interface FragmentBuilderProviderProps extends PropsWithChildren {
  builderManager: GraphState
}

export const FragmentBuilderProvider: FC<FragmentBuilderProviderProps> = ({ builderManager, children }) => {
  return <BuilderContext value={{ builderManager }}>{children}</BuilderContext>
}
