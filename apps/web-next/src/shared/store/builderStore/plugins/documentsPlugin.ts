import { createState, GraphState, LinkKey, Plugin } from '@graph-state/core'
import profilerPlugin from '@graph-state/plugin-profiler'
import fragmentData from '@/shared/data/fragment.json'
import buttonData from '@/shared/data/button.fragment.json'
import pluginFragmentSpring, { skips, skips as stateSkips } from '@fragments/plugin-fragment-spring'
import { builderStore } from '@/shared/store/builderStore'
import { fragmentModule } from '@/shared/data/fragment.module'
import { ApolloClient } from '@apollo/experimental-nextjs-app-support'

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
    manager: null,
    managerKey: null,
    isPreview: false
  }
  const documentGraphKey = state.keyOfEntity(documentGraph)

  state.mutate(state.key, {
    document: documentGraph
  })

  state.$documents = {
    key: documentGraphKey,
    cacheDocuments: new Map(),
    // apolloClient: null as ApolloClient<any> | null,
    // setApolloClient: (client: ApolloClient<any>) => (state.$documents.apolloClient = client),
    getDocumentManager: (fragmentKey: LinkKey) => {
      if (fragmentKey) {
        return state.$documents.cacheDocuments.get(fragmentKey)
      }

      return state.resolve(state.documentKey)?.manager
    },

    // loadFragment(fragmentId: number) {
    //   const apolloClient = state.$documents.apolloClient as ApolloClient<any> | null
    //
    //   if (apolloClient) {
    //     apolloClient.query()
    //   }
    // },

    createDocumentManager: (fragmentKey: LinkKey, document: unknown) => {
      if (state.$documents.cacheDocuments.has(fragmentKey)) {
        return state.$documents.cacheDocuments.get(fragmentKey)
      }

      const { _type, _id } = state.entityOfKey(fragmentKey)

      const documentManager = createState({
        _type,
        _id,
        initialState: {},
        plugins: [pluginFragmentSpring(fragmentKey)],
        skip: [...stateSkips, ...skips]
      })

      documentManager.$fragment.applySnapshot(document)

      state.$documents.cacheDocuments.set(fragmentKey, documentManager)
      return documentManager
    },

    setActiveDocumentManager: (fragmentKey: LinkKey | null) => {
      if (fragmentKey === null) {
        state.mutate(documentGraphKey, { manager: null, managerKey: null })
        return
      }

      if (state.$documents.cacheDocuments.has(fragmentKey)) {
        const manager = state.$documents.cacheDocuments.get(fragmentKey)
        state.mutate(documentGraphKey, { manager, managerKey: fragmentKey })
      }
    }
  }
}
