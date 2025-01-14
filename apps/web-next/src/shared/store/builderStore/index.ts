import { createState, GraphState, LinkKey } from '@graph-state/core'
import { SpringValue } from '@react-spring/web'
import { isInstanceOf } from '@graph-state/checkers'
import { isValue } from '@fragments/utils'
import { BuilderStoreDocumentPlugin, documentsPlugin } from './plugins/documentsPlugin'
import loggerPlugin from '@graph-state/plugin-logger'
import { canvasPlugin } from '@/shared/store/builderStore/plugins/canvasPlugin'
import { creatorPlugin } from '@/shared/store/builderStore/plugins/creatorPlugin'

export interface BuilderStore extends BuilderStoreDocumentPlugin {
  _type: 'Builder'
  tabs: LinkKey[]
  activeTabIndex: number
}

export const createBuilderStore = () => {
  return createState<BuilderStore, 'Builder'>({
    _type: 'Builder',
    initialState: {
      showTextEditor: false,
      mouseOverLayer: null,
      selectedProjectFile: null,
      tabs: [],
      activeTabIndex: -1,
      activeFragment: null,
      fragmentModules: []
    },
    skip: [isInstanceOf(SpringValue)],
    plugins: [
      loggerPlugin({ onlyBrowser: true }),
      documentsPlugin,
      canvasPlugin,
      creatorPlugin,
      state => {
        state.toggleTextEditor = (value?: boolean) => {
          if (isValue(value)) {
            state.mutate(state.key, { showTextEditor: value })
          } else {
            state.mutate(state.key, prev => ({ showTextEditor: !prev.showTextEditor }))
          }
        }

        state.mouseOverLayer = (layerLink: LinkKey) => state.mutate(state.key, { mouseOverLayer: layerLink })
        state.mouseLeaveLayer = () => state.mutate(state.key, { mouseOverLayer: null })

        state.openTab = targetGraph => {
          state.mutate(state.key, prev => {
            const targetKey = state.keyOfEntity(targetGraph)
            const tabsSize = prev.tabs?.length
            const alreadyIndex = prev.tabs?.indexOf(targetKey)

            return {
              tabs: alreadyIndex === -1 ? [targetGraph] : [],
              activeTabIndex: alreadyIndex === -1 ? tabsSize : alreadyIndex
            }
          })
        }

        state.closeTab = (index: number) => {
          state.mutate(
            state.key,
            p => {
              const nextTabs = p.tabs.toSpliced(index, 1)

              return {
                ...p,
                tabs: nextTabs,
                activeTabIndex: nextTabs.length - 1
              }
            },
            { replace: true }
          )
        }

        state.setActiveTabIndex = (index: number) => {
          state.mutate(state.key, {
            activeTabIndex: index
          })
        }

        state.selectProjectFile = (link: LinkKey) => {
          state.mutate(state.key, {
            selectedProjectFile: link
          })
        }
      }
    ]
  })
}
