import { useHotkeys } from 'react-hotkeys-hook'
import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'
import { useBuilderLayerFlags } from '@/shared/hooks/fragmentBuilder/useBuilderLayerFlags'
import { hotKeysScope } from '@/shared/hooks/hotkeys/HotKeysProvider'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'

export const useBuilderHotKeys = () => {
  const { selection } = useBuilderSelection()
  const layerFlags = useBuilderLayerFlags(selection)
  const { saveFragment } = useBuilderDocument()

  useHotkeys(
    'meta+s',
    keyboardEvent => {
      keyboardEvent.preventDefault()

      saveFragment()
    },
    { scopes: [hotKeysScope.builder] }
  )

  useHotkeys(
    'meta+d',
    keyboardEvent => {
      keyboardEvent.preventDefault()

      if (layerFlags.canDuplicate) {
        layerFlags.duplicate()
      }
    },
    { scopes: [hotKeysScope.builder] }
  )

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
  //
  // useHotkeys(
  //   'meta+enter',
  //   () => {
  //     if (layerFlags.canWrap) {
  //       layerFlags.wrapFrame()
  //     }
  //   },
  //   { scopes: [hotKeysScope.builder] }
  // )
  //
  // useHotkeys(
  //   'meta+backspace',
  //   () => {
  //     if (layerFlags.canRemoveWrapper) {
  //       layerFlags.removeWrapper()
  //     }
  //   },
  //   { scopes: [hotKeysScope.builder] }
  // )
}
