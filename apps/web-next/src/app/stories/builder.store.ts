import { createState, GraphState, LinkKey } from '@graph-state/core'
import { template } from '@/app/builder/widgets/Builder/template'
import fragmentsPlugin from '@fragments/fragments-plugin'
import { SelectionType, SetSelection } from '@fragments/fragments-plugin/src/types/nodes'

interface BuilderStore extends GraphState {
  builderLink: LinkKey
  setSelection(selections: any[]): void
}

export const BUILDER_LINK = 'Builder:root'

export const builderStore = createState({
  initialState: {
    document: template,
    builder: {
      _type: 'Builder',
      _id: 'root',
      view: 'default',
      selection: ['Frame:45b080252568c']
    }
  },
  plugins: [
    fragmentsPlugin,
    state => {
      state.builderLink = BUILDER_LINK

      state.setSelection = (firstArg: SetSelection, ...rest: any[]) => {
        let nodes: SelectionType[] = []

        if (typeof firstArg === 'function') {
          const currentSelection = state.resolve(state.builderLink)?.selection ?? []
          nodes = firstArg(currentSelection)
        } else {
          nodes = [firstArg, ...rest]
        }
        // TODO Нужно исключать детей выбранных нод
        state.mutate(
          state.builderLink,
          {
            selection: nodes
              .map(node => (typeof node === 'string' ? node : state.keyOfEntity(node)))
              .filter(Boolean) as string[]
          },
          { replace: true }
        )
      }

      return state
    }
  ]
}) as BuilderStore
