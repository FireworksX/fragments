import { use } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useGraph, useGraphStack } from '@graph-state/react'

export const useBuilderTabs = (inputBuilderManager?: unknown) => {
  const builderCtx = use(BuilderContext)
  const builderManager = inputBuilderManager ?? builderCtx.builderManager
  const [builder] = useGraph(builderManager, builderManager.key)
  const tabs = useGraphStack(builderManager, builder.tabs)

  return {
    tabs: tabs.map((tab, index) => ({ ...tab, isActive: index === builder.activeTabIndex })),
    activeTab: tabs.at(builder.activeTabIndex),
    activeTabKey: builderManager.keyOfEntity(tabs.at(builder.activeTabIndex)),
    openTab: target => builderManager.openTab(target),
    selectTab: targetOrIndex => {
      if (typeof targetOrIndex === 'number') {
        builderManager.setActiveTabIndex(targetOrIndex)
      } else {
        const targetKey = builderManager.keyOfEntity(targetOrIndex)
        const index = builder.tabs.findIndex(targetKey)
        builderManager.setActiveTabIndex(index)
      }
    },
    closeTab: targetOrIndex => {
      if (typeof targetOrIndex === 'number') {
        builderManager.closeTab(targetOrIndex)
      } else {
        const targetKey = builderManager.keyOfEntity(targetOrIndex)
        const index = builder.tabs.findIndex(targetKey)
        builderManager.closeTab(index)
      }
    }
  }
}
