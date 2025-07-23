import { useLayerValue } from '@/shared/hooks/fragmentBuilder/useLayerValue'

export const useBuilderCssOverride = () => {
  const [cssOverride, setCssOverride, { rawValue }] = useLayerValue('cssOverride')

  const onClickHeader = () => {
    if (cssOverride) {
      setCssOverride(null)
    } else {
      setCssOverride('/* Write custom css */')
    }
  }

  return {
    rawValue,
    cssOverride,
    setCssOverride,
    onClickHeader
  }
}
