import { createContext } from 'react'
import { GraphState } from '@graph-state/core'
import { CanvasStore } from '@/shared/store/canvasStore'

export const BuilderContext = createContext({
  builderManager: null,
  canvasManager: null as GraphState<CanvasStore, 'Canvas'> | null,
  globalManager: null
})
