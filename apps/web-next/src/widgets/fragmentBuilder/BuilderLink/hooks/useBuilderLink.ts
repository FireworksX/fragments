import { definition } from '@fragmentsx/definition'
import { useLayerValue } from '@/shared/hooks/fragmentBuilder/useLayerValue'

export const useBuilderLink = () => {
  const [href, setHref] = useLayerValue('href')
  const [hrefTarget, setHrefTarget] = useLayerValue('hrefTarget')

  const onClickHeader = () => {
    if (href) {
      setHref(null)
    } else {
      setHref('/')
    }
  }

  return {
    href,
    setHref,
    isNewTab: {
      value: hrefTarget,
      onChange: setHrefTarget,
      items: [
        { label: 'Yes', name: definition.linkTarget._blank },
        { label: 'No', name: definition.linkTarget.none }
      ]
    },
    onClick: onClickHeader
  }
}
