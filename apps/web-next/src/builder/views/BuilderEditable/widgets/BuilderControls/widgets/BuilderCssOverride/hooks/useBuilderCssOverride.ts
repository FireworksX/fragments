import { LinkKey } from '@graph-state/core'
import { popoutsStore } from '@/app/store/popouts.store'
import { useBuilderSelection } from '@/builder/hooks/useBuilderSelection'
import { useLayerInvoker } from '@/builder/hooks/useLayerInvoker'
import { useContext } from 'react'
import { BuilderContext } from '@/builder/BuilderContext'

export const useBuilderCssOverride = () => {
  const { documentManager } = useContext(BuilderContext)
  const { selection, selectionGraph } = useBuilderSelection()
  const layerInvoker = useLayerInvoker(selection, ({ key, node, value }) => {
    switch (key) {
      case 'cssText':
        node.setCssText(value)
        break
      case 'cssLinks':
        node.setCssLinks(value)
        break
    }
  })
  const cssOverride = layerInvoker('cssText')
  const cssOverrideVariables = layerInvoker('cssLinks')
  const isEmpty = documentManager.isEmpty(cssOverride.value)

  const onClickHeader = () => {
    if (!isEmpty) {
      cssOverride.onChange(undefined)
      cssOverrideVariables.value?.forEach(removeVariable)
    } else {
      cssOverride.onChange('/* Write custom css */')
    }
  }

  const selectCss = () => {
    popoutsStore.open('cssOverrideList', {})
  }

  const removeVariable = (variableKey: LinkKey) => {
    cssOverrideVariables.onChange(cssOverrideVariables.value?.filter(key => key !== variableKey))
  }

  return {
    selectionGraph,
    isEmpty,
    css: cssOverride,
    variables: cssOverrideVariables,
    onClick: onClickHeader,
    selectCss,
    removeVariable
  }
}
