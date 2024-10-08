import { createState, GraphState, LinkKey } from '@graph-state/core'
import { SpringValue } from '@react-spring/web'
import { isInstanceOf } from '@graph-state/checkers'
import { findRefNode } from '@/builder/utils/findRefNode'

export type CanvasManager = GraphState

export const createCanvasManager = () =>
  createState({
    initialState: {
      x: new SpringValue(0),
      y: new SpringValue(0),
      scale: new SpringValue(1),
      bounds: [0, 0, 0, 0]
    },
    skip: [isInstanceOf(SpringValue)],
    plugins: [
      state => {
        state.toCenter = () => {
          const x$ = state.resolve(state.key)?.x
          const y$ = state.resolve(state.key)?.y
          const bound = state.resolve(state.key)?.bound

          if (x$ && y$) {
            x$.start(bound[0] + bound[2] / 2)
            y$.start(bound[1] + bound[3] / 2)
          }
        }

        state.updateBound = (x, y, width, height) => {
          state.mutate(state.key, prev => ({ ...prev, bounds: [x, y, width, height] }), { replace: true })
        }

        state.scrollAndZoomIntoView = (node: LinkKey) => {
          const [, , width, height] = state.resolve(state.key).bounds
          const { x: x$, y: y$ } = state.resolve(state.key) || {}

          const rect = findRefNode(node)?.getBoundingClientRect()

          if (rect) {
            const x = width / 2 - rect.width / 2
            const y = height / 2 - rect.height / 2

            x$.start(x)
            y$.start(y)
          }
        }
      }
    ]
  })
