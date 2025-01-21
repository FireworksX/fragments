import { createState, GraphState, LinkKey, Plugin } from '@graph-state/core'
import fragmentData from '@/shared/data/fragment.json'
import buttonData from '@/shared/data/button.fragment.json'
import pluginFragmentSpring, { skips, skips as stateSkips } from '@fragments/plugin-fragment-spring'
import { builderStore } from '@/shared/store/builderStore'
import { fragmentModule } from '@/shared/data/fragment.module'

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
    isPreview: false
  }
  const documentGraphKey = state.keyOfEntity(documentGraph)

  state.mutate(state.key, {
    document: documentGraph
  })
  state.documentKey = 'Document:root'
  state.getDocumentManager = () => state.resolve(state.documentKey)?.manager
  state.cacheDocuments = new Map()

  const getDocumentManager = (fragmentKey: LinkKey) => {
    if (state.cacheDocuments.has(fragmentKey)) {
      return state.cacheDocuments.get(fragmentKey)
    }

    const { _type, _id } = state.entityOfKey(fragmentKey)

    const documentManager = createState({
      _type,
      _id,
      initialState: {},
      plugins: [pluginFragmentSpring(fragmentKey)],
      skip: [...stateSkips, ...skips]
    })

    state.cacheDocuments.set(fragmentKey, documentManager)

    return documentManager
  }

  const createDocumentManager = (fragmentKey: LinkKey) => {
    const module = fragmentModule

    return new Promise(resolve =>
      setTimeout(() => {
        const manager = getDocumentManager(fragmentKey)

        const linkedFragments = (module.linkedFragments ?? []).map(linkedModule => {
          const linkedManager = getDocumentManager(state.keyOfEntity(linkedModule))
          linkedManager.$fragment.applySnapshot(module.data)

          return linkedManager
        })

        manager.$fragment.applySnapshot(module.data)
        manager.$fragment.linkFragments(linkedFragments)

        // manager.$fragment.applySnapshot(dataMap[fragmentKey])
        resolve(manager)
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
