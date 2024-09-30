import { createState, GraphState, LinkKey } from '@graph-state/core'
import { managerPlugin, documentPlugin } from '@fragments/fragments-plugin/performance'
import { richTextPlugin } from '@/app/store/builder/builderRichTextPlugin'
import { template } from '@/app/builder/[fragmentId]/widgets/Builder/template'

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
    managerPlugin,
    richTextPlugin,
    documentPlugin,
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
