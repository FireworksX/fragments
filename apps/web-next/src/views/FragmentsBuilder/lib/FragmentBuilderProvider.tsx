import { FC, PropsWithChildren } from 'react'
import { DndContext, MouseSensor, pointerWithin, useSensor, useSensors } from '@dnd-kit/core'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { GraphState } from '@graph-state/core'
import { GlobalManager } from '@fragmentsx/render-react'

interface FragmentBuilderProviderProps extends PropsWithChildren {
  builderManager: GraphState
  canvasManager: GraphState
}

export const FragmentBuilderProvider: FC<FragmentBuilderProviderProps> = ({ children, ...value }) => {
  return <BuilderContext value={value}>{children}</BuilderContext>
}
