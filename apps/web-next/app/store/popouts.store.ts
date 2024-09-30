import { createState } from '@graph-state/core'
import extendPlugin from '@graph-state/plugin-extend'
import loggerPlugin from '@graph-state/plugin-logger'
import { isInstanceOf } from '@graph-state/checkers'
import { SpringValue } from '@react-spring/web'

export const POPOUT_TYPE = 'Popout'

export const popoutsStore = createState({
  initialState: {
    history: [],
    cursor: 0
  },
  plugins: [
    loggerPlugin(),
    state => {
      state.getCurrent = () => state.resolve(state).history.at(state.resolve(state).cursor)
      state.nextPopout = () => state.resolve(state).history.at(state.resolve(state).cursor + 1)
      state.prevPopout = () =>
        state.resolve(state).cursor > 0 ? state.resolve(state).history.at(state.resolve(state).cursor - 1) : undefined

      state.updateCurrentContext = context => {
        state.mutate(state.getCurrent(), { context })
      }

      state.open = (name, { context, description, position, initial }) => {
        const { history, cursor } = state.resolve(state) || {}
        const currentPopout = state.resolve(state.getCurrent())
        const resultPosition = initial ? position || 'right' : position || currentPopout?.position || 'right'
        const nextCell = { _type: POPOUT_TYPE, _id: name, name, description, context, position: resultPosition }
        const nextCellKey = state.keyOfEntity(nextCell)
        const currentHistory = history[cursor]
        const indexHistoryPopout = history.findLastIndex(historyLink => historyLink === nextCellKey)

        if (initial) {
          return state.mutate(
            {
              history: [nextCell],
              cursor: 0
            },
            { replace: true }
          )
        }

        if (currentHistory !== nextCellKey) {
          if (indexHistoryPopout === -1) {
            const nextHistory = [...history, nextCell]

            state.mutate({
              history: [nextCell],
              cursor: nextHistory.length - 1
            })
          } else {
            // Is pass new context, need update graph
            state.mutate(nextCell)
            state.mutate(state.key, {
              cursor: indexHistoryPopout
            })
          }
        }
      }

      state.close = () => {
        state.mutate(
          {
            history: [],
            cursor: 0
          },
          { replace: true }
        )
      }

      state.goPrev = () =>
        state.mutate(state.key, ({ cursor }) => ({
          cursor: cursor > 1 ? cursor - 1 : 0
        }))
    }
  ],
  skip: [isInstanceOf(SpringValue)]
})
