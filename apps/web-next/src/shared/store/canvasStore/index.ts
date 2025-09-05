import { createState, GraphState, LinkKey } from '@graph-state/core'
import { builderCanvasMode } from '@/shared/constants/builderConstants'
import { SpringValue } from '@react-spring/web'
import { isInstanceOf } from '@graph-state/checkers'

export interface CanvasStore {
  _type: 'Canvas'
  canvasMode: keyof typeof builderCanvasMode
  canvasModeContext?: unknown
  hoverLayer?: LinkKey | null
  selectLayer?: LinkKey | null
  isDraggingLayer: boolean
  isResizing: boolean
  isTextEditing: boolean
  x: SpringValue<number>
  y: SpringValue<number>
  scale: SpringValue<number>
}

export const createCanvasStore = () =>
  createState<CanvasStore, 'Canvas'>({
    initialState: {
      canvasMode: builderCanvasMode.select,
      canvasModeContext: null,
      hoverLayer: null,
      selectLayer: null,
      isDraggingLayer: false,
      isTextEditing: false,
      isResizing: false,
      x: new SpringValue(0),
      y: new SpringValue(0),
      scale: new SpringValue(1)
    },
    skip: [isInstanceOf(SpringValue)]
  })
