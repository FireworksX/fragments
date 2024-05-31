import { createState, GraphState, LinkKey } from '@graph-state/core'
import { template } from '@/app/builder/widgets/Builder/template'
import fragmentsPlugin from '@fragments/fragments-plugin'
import { SelectionType, SetSelection } from '@fragments/fragments-plugin/src/types/nodes'

interface BuilderStore extends GraphState {
  builderLink: LinkKey
  setSelection(selections: any[]): void
}

export const builderStore = createState({
  initialState: {
    document: template,
    view: 'default',
    selection: ['Frame:45b080252568c']
  },
  plugins: [
    fragmentsPlugin,
    state => {
      state.setSelection = (link: LinkKey) => {
        state.mutate({ selection: [link] }, { replace: true })
      }
    }
  ]
}) as BuilderStore
