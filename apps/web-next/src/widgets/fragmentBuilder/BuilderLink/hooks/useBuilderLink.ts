import { useLayerValue } from '@/shared/hooks/fragmentBuilder/useLayerValue'
import { useLayerPropertyValue } from '@/shared/hooks/fragmentBuilder/useLayerPropertyVariable'

export const useBuilderLink = () => {
  const [href, setHref] = useLayerValue('href')
  const [hrefNewTab, setHrefNewTab] = useLayerValue('hrefNewTab')
  const hrefVariable = useLayerPropertyValue('href')
  const hrefTargetVariable = useLayerPropertyValue('hrefNewTab')

  const onClickHeader = () => {
    if (href) {
      setHref(null)
    } else {
      setHref('/')
    }
  }

  return {
    href: {
      value: href,
      variable: hrefVariable,
      onChange: setHref
    },
    isNewTab: {
      value: hrefNewTab,
      variable: hrefTargetVariable,
      onChange: setHrefNewTab,
      items: [
        { label: 'Yes', name: true },
        { label: 'No', name: false }
      ]
    },
    onClick: onClickHeader
  }
}
