import { useLayerInvoker } from '@/shared/hooks/fragmentBuilder/useLayerInvoker'
import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'
import { booleanTabsSelectorItems } from '@/shared/data'
import { definition } from '@fragments/definition'

export const useBuilderLink = () => {
  const { selection, selectionGraph } = useBuilderSelection()
  const layerInvoker = useLayerInvoker(selection, ({ key, node, value }) => {
    switch (key) {
      case 'href':
        node.setHref(value)
        break
      case 'target':
        node.setTarget(value)
        break
    }
  })
  const hrefInvoker = layerInvoker('href')
  const newTabInvoker = layerInvoker('target')

  const onClickHeader = () => {
    if (hrefInvoker.value) {
      hrefInvoker.onChange(null)
    } else {
      hrefInvoker.onChange('/')
    }
  }

  return {
    disabled: !('setHref' in (selectionGraph ?? {})),
    href: hrefInvoker,
    isNewTab: {
      ...newTabInvoker,
      items: [
        { label: 'Yes', name: definition.linkTarget._blank },
        { label: 'No', name: null }
      ]
    },
    onClick: onClickHeader
  }
}
