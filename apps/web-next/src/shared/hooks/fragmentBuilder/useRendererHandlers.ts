import { OnClickSelectorOptions } from '@/app/builder/[fragmentId]/widgets/Builder/hooks/useBuilderLayerRefs'
import { useCallback, useContext } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { builderNodes } from '@fragments/fragments-plugin/performance'
import { debounce } from '@fragments/utils'
import { useBuilderManager } from '@/shared/hooks/fragmentBuilder/useBuilderManager'

export const useRendererHandlers = () => {
  const { documentManager, builderManager } = useContext(BuilderContext)
  const { updateParams } = useBuilderManager()

  const handleClick = (e, options: OnClickSelectorOptions) => {
    e.preventDefault()
    e.stopPropagation()

    const clickedLayerValue = documentManager.resolve(options.layerKey)

    if (clickedLayerValue?._type === builderNodes.Text && e.detail === 2) {
      updateParams({
        focus: options.layerKey
      })
      builderManager.toggleTextEditor(true)

      return
    }

    builderManager.toggleTextEditor(false)
    updateParams({
      focus: options.layerKey
    })
  }

  const mouseOver = useCallback(
    debounce((e, options) => {
      e.preventDefault()
      e.stopPropagation()
      // builderManager.mouseOverLayer(options.layerKey)
    }),
    [builderManager]
  )

  const mouseLeave = useCallback(
    debounce(e => {
      e.preventDefault()
      e.stopPropagation()
      // builderManager.mouseLeaveLayer()
    }),
    [builderManager]
  )

  return {
    handleClick,
    mouseOver,
    mouseLeave
  }
}