import { useBuilderSelection } from '@/app/builder/widgets/Builder/hooks/useBuilderSelection'
import { useLayerInvokerNew } from '@/app/builder/widgets/Builder/hooks/useLayerInvokerNew'
import { useContext } from 'react'
import { BuilderContext } from '@/app/builder/widgets/Builder/BuilderContext'
import { LinkKey } from '@graph-state/core'
import { popoutsStore } from '@/app/store/popouts.store'

export const useBuilderCssOverride = () => {
  const { graphState } = useContext(BuilderContext)
  const { selection } = useBuilderSelection()
  const layerInvoker = useLayerInvokerNew(selection, ({ key, node, value }) => {
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
  const isEmpty = graphState.isEmpty(cssOverride.value)

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
    isEmpty,
    css: cssOverride,
    variables: cssOverrideVariables,
    onClick: onClickHeader,
    selectCss,
    removeVariable
  }
}
