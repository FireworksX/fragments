import { createState, LinkKey, Plugin } from '@graph-state/core'
import fragmentData from '@/views/FragmentDetail/fragment.json'
import buttonData from '@/views/FragmentDetail/button.fragment.json'
import pluginFragmentSpring, { skips, skips as stateSkips } from '@fragments/plugin-fragment-spring'
import loggerPlugin from '@graph-state/plugin-logger'

const dataMap = {
  'Fragment:g34gherhg3g': fragmentData,
  'Fragment:buttonid': buttonData
}

export const documentManagersModule: Plugin = (state, { overrideMutate }) => {
  const orig = state.resolve

  state.resolve = (...args) => {
    if (args.at(0) === 'DocumentManager:buttonid') {
      console.trace('resolve', args.at(0))
    }
    return orig(...args)
  }

  state.mutate(state.key, {
    fetchingDocumentManager: false,
    documentManager: null,
    documentManagers: []
  })

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
      }, 1200)
    )
  }

  state.subscribe(state.key, async (next, prev) => {
    if (next?.activeTabIndex !== prev?.activeTabIndex) {
      const activeTab = state.resolve(next.tabs.at(next.activeTabIndex))

      if (activeTab?._type === 'FragmentModule') {
        const fragmentKey = activeTab.fragment
        const { _id: fragmentId } = state.entityOfKey(fragmentKey)
        const documentManagerKey = `DocumentManager:${fragmentId}`

        if (state.resolve(documentManagerKey)) {
          state.mutate(state.key, { documentManager: documentManagerKey })
        } else {
          state.mutate(state.key, { fetchingDocumentManager: true, documentManager: null })

          const documentManagerData = await createDocumentManager(fragmentKey)
          state.mutate(state.key, {
            documentManager: {
              ...state.entityOfKey(documentManagerKey),
              manager: documentManagerData
            },
            documentManagers: [documentManagerKey],
            fetchingDocumentManager: false
          })
        }
      }
    }
  })
}
