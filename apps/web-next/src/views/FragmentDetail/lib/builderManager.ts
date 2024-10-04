import { createState, GraphState, LinkKey } from '@graph-state/core'
import { SpringValue } from '@react-spring/web'
import { isInstanceOf } from '@graph-state/checkers'
import { isValue } from '@fragments/utils'

export type BuilderManager = GraphState

export const createBuilderManager = () =>
  createState({
    initialState: {
      showTextEditor: false,
      mouseOverLayer: null
    },
    skip: [isInstanceOf(SpringValue)],
    plugins: [
      state => {
        state.toggleTextEditor = (value?: boolean) => {
          if (isValue(value)) {
            state.mutate(state.key, { showTextEditor: value })
          } else {
            state.mutate(state.key, prev => ({ showTextEditor: !prev.showTextEditor }))
          }
        }

        state.mouseOverLayer = (layerLink: LinkKey) => state.mutate(state.key, { mouseOverLayer: layerLink })
        state.mouseLeaveLayer = () => state.mutate(state.key, { mouseOverLayer: null })
      }
    ]
  })
