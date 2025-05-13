import { useLayerValue } from '@/shared/hooks/fragmentBuilder/useLayerValue'

export const useBuilderCssOverride = () => {
  const [cssOverride, setCssOverride] = useLayerValue('cssOverride')

  const onClickHeader = () => {
    if (cssOverride) {
      setCssOverride(null)
    } else {
      setCssOverride('/* Write custom css */')
    }
  }

  return {
    cssOverride,
    setCssOverride,
    onClickHeader
  }
}
