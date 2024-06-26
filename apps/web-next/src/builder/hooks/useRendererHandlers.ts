import { OnClickSelectorOptions } from '@/app/builder/[fragmentId]/widgets/Builder/hooks/useBuilderLayerRefs'
import { useBuilderManager } from '@/builder/hooks/useBuilderManager'

export const useRendererHandlers = () => {
  const { setFocusNode } = useBuilderManager()

  const handleClick = (e, options: OnClickSelectorOptions) => {
    e.preventDefault()
    e.stopPropagation()

    setFocusNode(options.layerKey)
  }

  return {
    handleClick
  }
}
