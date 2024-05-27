import { useBuilderSelection } from '@/app/builder/widgets/Builder/hooks/useBuilderSelection'
import { useLayerInvokerNew } from '@/app/builder/widgets/Builder/hooks/useLayerInvokerNew'
import { TabsSelectorItem } from '@/app/components/TabsSelector'
import { useContext } from 'react'
import { BuilderContext } from '@/app/builder/widgets/Builder/BuilderContext'

const newTabItems: TabsSelectorItem[] = [
  {
    name: true,
    label: 'Yes'
  },
  {
    name: false,
    label: 'No'
  }
]

export const useBuilderLink = () => {
  const { graphState } = useContext(BuilderContext)
  const { selection } = useBuilderSelection()
  const layerInvoker = useLayerInvokerNew(selection, ({ key, node, value }) => {
    switch (key) {
      case 'hyperlinkHref':
        node.setHyperlinkHref(value)
        break
      case 'hyperlinkNewTab':
        node.setHyperlinkNewTab(value)
        break
    }
  })
  const hrefInvoker = layerInvoker('hyperlinkHref')
  const newTabInvoker = layerInvoker('hyperlinkNewTab')

  const onClickHeader = () => {
    if (hrefInvoker.value !== graphState.empty) {
      hrefInvoker.onChange(undefined)
    } else {
      hrefInvoker.onChange('')
    }
  }

  return {
    href: hrefInvoker,
    isNewTab: {
      ...newTabInvoker,
      items: newTabItems
    },
    onClick: onClickHeader
  }
}
