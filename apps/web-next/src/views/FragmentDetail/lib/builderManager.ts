import { createState, GraphState, LinkKey } from '@graph-state/core'
import { SpringValue } from '@react-spring/web'
import { isInstanceOf } from '@graph-state/checkers'
import { isValue } from '@fragments/utils'
import loggerPlugin from '@graph-state/plugin-logger'

export type BuilderManager = GraphState

export const createBuilderManager = () =>
  createState({
    initialState: {
      showTextEditor: false,
      mouseOverLayer: null,
      selectedProjectFile: null,
      tabs: [],
      activeTabIndex: -1,
      activeFragment: null,
      fragmentModules: [],
      documentManager: null
    },
    skip: [isInstanceOf(SpringValue)],
    plugins: [
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
