import { TabsSelectorItem } from '@/app/components/TabsSelector'
import { useLayerInvoker } from '@/shared/hooks/fragmentBuilder/useLayerInvoker'
import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'

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
  const { selection, selectionGraph } = useBuilderSelection()
  const layerInvoker = useLayerInvoker(selection, ({ key, node, value }) => {
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
    if (hrefInvoker.value) {
      hrefInvoker.onChange(undefined)
    } else {
      hrefInvoker.onChange('/')
    }
  }

  return {
    selectionGraph,
    href: hrefInvoker,
    isNewTab: {
      ...newTabInvoker,
      items: newTabItems
    },
    onClick: onClickHeader
  }
}
