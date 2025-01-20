import { createState, GraphState, LinkKey, Plugin } from '@graph-state/core'
import fragmentData from '@/shared/data/fragment.json'
import buttonData from '@/shared/data/button.fragment.json'
import pluginFragmentSpring, { skips, skips as stateSkips } from '@fragments/plugin-fragment-spring'
import { builderStore } from '@/shared/store/builderStore'

const dataMap = {
  'Fragment:g34gherhg3g': fragmentData,
  'Fragment:buttonid': buttonData
}

export interface BuilderStoreDocumentPlugin {
  fetchingDocumentManager: boolean
  documentManager: GraphState
  documentManagers: LinkKey[]
}

export const documentsPlugin = (state: typeof builderStore) => {
  const documentGraph = {
    _type: 'Document',
    _id: 'root',
    fetching: false,
    manager: null
  }
  const documentGraphKey = state.keyOfEntity(documentGraph)

  state.mutate(state.key, {
    document: documentGraph
  })
  state.documentKey = 'Document:root'
  state.getDocumentManager = () => state.resolve(state.documentKey)?.manager

  const createDocumentManager = (fragmentKey: LinkKey) => {
    return new Promise(resolve =>
      setTimeout(() => {
        const documentManager = createState({
          initialState: {},
          plugins: [pluginFragmentSpring(fragmentKey)],
          skip: [...stateSkips, ...skips]
        })

        documentManager.$fragment.applySnapshot(dataMap[fragmentKey])
        resolve(documentManager)
      }, 1)
    )
  }

  state.subscribe(state.key, async (next, prev) => {
    if (next?.activeTabIndex !== prev?.activeTabIndex) {
      const activeTab = state.resolve(next.tabs.at(next.activeTabIndex))

      if (activeTab?._type === 'FragmentModule') {
        const fragmentKey = activeTab.fragment

        state.mutate(documentGraphKey, { fetching: true })
        const documentManagerData = await createDocumentManager(fragmentKey)
        state.mutate(documentGraphKey, { fetching: false, manager: documentManagerData })

        // TODO Remove
        // if (state.resolve(documentManagerKey)) {
        //   state.mutate(state.key, { documentManager: documentManagerKey })
        // } else {
        //   state.mutate(state.key, { fetchingDocumentManager: true, documentManager: null })
        //
        //   const documentManagerData = await createDocumentManager(fragmentKey)
        //   state.mutate(state.key, {
        //     documentManager: {
        //       ...state.entityOfKey(documentManagerKey),
        //       manager: documentManagerData
        //     },
        //     documentManagers: [documentManagerKey],
        //     fetchingDocumentManager: false
        //   })
        // }
      }
    }
  })
}
