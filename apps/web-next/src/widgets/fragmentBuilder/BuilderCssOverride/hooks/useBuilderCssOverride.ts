import { LinkKey } from '@graph-state/core'
import { popoutsStore } from '@/app/store/popouts.store'
import { useContext } from 'react'
import { BuilderContext } from '@/builder/BuilderContext'
import { to } from '@react-spring/web'
import { isValue } from '@fragments/utils'
import { animatableValue } from '@/shared/utils/animatableValue'
import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'
import { useLayerInvoker } from '@/shared/hooks/fragmentBuilder/useLayerInvoker'

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
  const hasCssOverride = to(cssOverride.value, cssText => isValue(cssText))

  const onClickHeader = () => {
    if (animatableValue(hasCssOverride)) {
      cssOverride.onChange(null)
      // cssOverrideVariables.value?.forEach(removeVariable)
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
    hasCssOverride,
    cssOverride,
    variables: cssOverrideVariables,
    onClick: onClickHeader,
    selectCss,
    removeVariable
  }
}
