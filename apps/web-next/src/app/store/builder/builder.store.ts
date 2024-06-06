import { createState, GraphState, LinkKey } from '@graph-state/core'
import { template } from '@/app/builder/widgets/Builder/template'
import fragmentsPlugin from '@fragments/fragments-plugin'
import { richTextPlugin } from '@/app/store/builder/builderRichTextPlugin'

interface BuilderStore extends GraphState {
  builderLink: LinkKey
  setSelection(selections: any[]): void
}

export const builderStore = createState({
  initialState: {
    document: template,
    view: 'default',
    focusComponent: null,
    selection: []
  },
  plugins: [
    fragmentsPlugin,
    richTextPlugin,
    state => {
      state.setSelection = (link: LinkKey) => {
        state.mutate(state.keyOfEntity(state), prev => ({ ...prev, selection: [link] }), { replace: true })
      }
      state.setView = (view: string) => {
        state.mutate(state.keyOfEntity(state), { view })
      }
      state.focusComponent = (componentLink: LinkKey) => {
        state.mutate(state.keyOfEntity(state), { focusComponent: componentLink })
      }
    }
  ]
}) as BuilderStore
