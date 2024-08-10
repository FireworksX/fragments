import { createState, GraphState } from '@graph-state/core'
import { SpringValue } from '@react-spring/web'
import { isInstanceOf } from '@graph-state/checkers'

export type CanvasManager = GraphState

export const createCanvasManager = () =>
  createState({
    initialState: {
      x: new SpringValue(0),
      y: new SpringValue(0),
      scale: new SpringValue(1)
    },
    skip: [isInstanceOf(SpringValue)]
  })
