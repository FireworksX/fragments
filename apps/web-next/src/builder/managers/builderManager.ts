import { createState, GraphState } from '@graph-state/core'
import { SpringValue } from '@react-spring/web'
import { isInstanceOf } from '@graph-state/checkers'
import { isValue } from '@fragments/utils'

export type BuilderManager = GraphState

export const createBuilderManager = () =>
  createState({
    initialState: {
      showTextEditor: false
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
      }
    ]
  })
