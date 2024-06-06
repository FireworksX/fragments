import { TabsSelectorItem } from '@/app/components/TabsSelector'
import { useBuilderSelection } from '@/app/builder/widgets/Builder/hooks/useBuilderSelection'
import { useLayerInvokerNew } from '@/app/builder/widgets/Builder/hooks/useLayerInvokerNew'
import { useContext } from 'react'
import { BuilderContext } from '@/app/builder/widgets/Builder/BuilderContext'
import { builderNodes } from '@fragments/fragments-plugin'
import { popoutsStore } from '@/app/store/popouts.store'

const visible: TabsSelectorItem[] = [
  {
    name: true,
    label: 'Yes'
  },
  {
    name: false,
    label: 'No'
  }
]

export const useBuilderStyles = () => {
  const { graphState } = useContext(BuilderContext)
  const { selection, selectionGraph } = useBuilderSelection()
  const isTextLayer = selectionGraph?._type === builderNodes.Text
  const layerInvoker = useLayerInvokerNew(selection, ({ node, key, value }) => {
    switch (key) {
      case 'visible':
        node.toggleVisible()
        break
      case 'opacity':
        node.setOpacity(value)
        break
      case 'zIndex':
        node.setZIndex(value)
        break
      case 'cornerRadius':
        node.setCornerRadius(+value)
        break
      case 'fillType':
        node.setFillType(value)

        if (!value) {
          // $closePopout()
        }
        break
    }
  })
  const borderInvoker = layerInvoker('border')
  const fillTypeInvoker = layerInvoker('fillType')
  const fillsInvoker = layerInvoker('fills')
  const zIndexInvoker = layerInvoker('zIndex')

  const openBorder = () => {
    popoutsStore.open('border', {
      initial: true
    })
  }

  const openFill = () => {
    popoutsStore.open('fill', {
      initial: true
    })
  }

  const clickZIndex = () => {
    zIndexInvoker.onChange(0)
  }

  return {
    selectionGraph,
    visible: {
      items: visible,
      ...layerInvoker('visible')
    },
    opacity: layerInvoker('opacity'),
    radius: {
      disabled: isTextLayer,
      ...layerInvoker('cornerRadius')
    },
    zIndex: {
      disabled: graphState.isEmpty(zIndexInvoker.value),
      ...zIndexInvoker,
      onClick: clickZIndex
    },
    border: {
      ...borderInvoker,
      value: borderInvoker.value,
      disabled: isTextLayer,
      onClick: openBorder,
      onReset: () => borderInvoker.onChange(null)
    },
    fill: {
      ...fillsInvoker,
      value: selectionGraph?.getCurrentFill?.(),
      type: fillTypeInvoker.value,
      disabled: isTextLayer,
      onClick: openFill,
      onReset: () => fillTypeInvoker.onChange(null)
    }
  }
}
