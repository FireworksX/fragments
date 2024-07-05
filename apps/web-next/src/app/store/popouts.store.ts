import { createState } from '@graph-state/core'
import extendPlugin from '@graph-state/plugin-extend'
import loggerPlugin from '@graph-state/plugin-logger'

export const POPOUT_TYPE = 'Popout'

export const popoutsStore = createState({
  initialState: {
    history: [],
    cursor: 0
  },
  plugins: [
    state => {
      state.getCurrent = () => state.resolve().history.at(state.resolve().cursor)
      state.nextPopout = () => state.resolve().history.at(state.resolve().cursor + 1)
      state.prevPopout = () =>
        state.resolve().cursor > 0 ? state.resolve().history.at(state.resolve().cursor - 1) : undefined

      state.open = (name, { context, position, initial }) => {
        const { history, cursor } = state.resolve() || {}

        const nextCell = { _type: POPOUT_TYPE, _id: name, name, context, position: (initial && position) || 'right' }
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

            state.mutate(
              {
                history: nextHistory,
                cursor: nextHistory.length - 1
              },
              { replace: true }
            )
          } else {
            // Is pass new context, need update graph
            state.mutate(nextCell)
            state.mutate(
              {
                history: history.slice(0, indexHistoryPopout + 1),
                cursor: indexHistoryPopout
              },
              { replace: true }
            )
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
  ]
})
