import { useHotkeys } from 'react-hotkeys-hook'
import { hotKeysScope } from '@/app/hooks/hotkeys/HotKeysProvider'
import { useContext } from 'react'
import { BuilderContext } from '@/builder/BuilderContext'
import { useBuilderSelection } from '@/builder/hooks/useBuilderSelection'
import { useBuilderLayerFlags } from '@/builder/views/BuilderEditable/widgets/BuilderLayers/components/BuilderLayerCell/hooks/useBuilderLayerFlags'

export const useBuilderHotKeys = () => {
  const { documentManager } = useContext(BuilderContext)
  const { selectionGraph, selection } = useBuilderSelection()
  const layerFlags = useBuilderLayerFlags(selection)

  useHotkeys(
    'backspace',
    () => {
      if (layerFlags.canRemove) {
        layerFlags.remove()
      }
    },
    { scopes: [hotKeysScope.builder] }
  )

  useHotkeys(
    'meta+;',
    () => {
      layerFlags.toggleVisible()
    },
    { scopes: [hotKeysScope.builder] }
  )

  useHotkeys(
    'meta+enter',
    () => {
      if (layerFlags.canWrap) {
        layerFlags.wrapFrame()
      }
    },
    { scopes: [hotKeysScope.builder] }
  )

  useHotkeys(
    'meta+backspace',
    () => {
      if (layerFlags.canRemoveWrapper) {
        layerFlags.removeWrapper()
      }
    },
    { scopes: [hotKeysScope.builder] }
  )
}
