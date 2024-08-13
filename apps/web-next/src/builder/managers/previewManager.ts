import { createState, GraphState, LinkKey } from '@graph-state/core'
import { SpringValue } from '@react-spring/web'
import { isInstanceOf } from '@graph-state/checkers'
import { findRefNode } from '@/builder/utils/findRefNode'

export type PreviewManager = GraphState

export const createPreviewManager = () =>
  createState({
    initialState: {
      width: new SpringValue(320),
      height: new SpringValue(300)
    },
    skip: [isInstanceOf(SpringValue)],
    plugins: [
      state => {
        state.setWidth = (width: number) => {
          const width$ = state.resolve(state.key)?.width
          width$.start(width)
        }
        state.setHeight = (height: number) => {
          const height$ = state.resolve(state.key)?.height
          height$.start(height)
        }
      }
    ]
  })
