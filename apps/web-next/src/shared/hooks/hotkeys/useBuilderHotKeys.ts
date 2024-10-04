import { useHotkeys } from 'react-hotkeys-hook'
import { useContext } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'
import { useBuilderLayerFlags } from '@/shared/hooks/fragmentBuilder/useBuilderLayerFlags'
import { hotKeysScope } from '@/shared/hooks/hotkeys/HotKeysProvider'

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
