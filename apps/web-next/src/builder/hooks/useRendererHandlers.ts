import { OnClickSelectorOptions } from '@/app/builder/[fragmentId]/widgets/Builder/hooks/useBuilderLayerRefs'
import { builderModes, useBuilderManager } from '@/builder/hooks/useBuilderManager'
import { useContext } from 'react'
import { BuilderContext } from '@/builder/BuilderContext'
import { builderNodes } from '@fragments/fragments-plugin/performance'
import { findRefNode } from '@/builder/utils/findRefNode'
import { useGraph } from '@graph-state/react'

export const useRendererHandlers = () => {
  const { documentManager } = useContext(BuilderContext)
  const { setFocusNode, changeMode } = useBuilderManager()
  const [richEditor] = useGraph(documentManager, documentManager.richEditor)

  const handleClick = (e, options: OnClickSelectorOptions) => {
    e.preventDefault()
    e.stopPropagation()

    const clickedLayerValue = documentManager.resolve(options.layerKey)

    if (clickedLayerValue?._type === builderNodes.Text && e.detail === 2) {
      // $layers.setKey('openLayerField', options.layerKey)
      // setFocusNode(options.layerKey)
      // graphState.setView('text')

      richEditor.setEditable(true)
    }

    setFocusNode(options.layerKey)
  }

  return {
    handleClick
  }
}
