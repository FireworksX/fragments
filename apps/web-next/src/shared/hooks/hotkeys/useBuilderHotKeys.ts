import { useHotkeys } from 'react-hotkeys-hook'
import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'
import { useBuilderLayerFlags } from '@/shared/hooks/fragmentBuilder/useBuilderLayerFlags'
import { hotKeysScope } from '@/shared/hooks/hotkeys/HotKeysProvider'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'

export const useBuilderHotKeys = () => {
  const { selection } = useBuilderSelection()
  const layerFlags = useBuilderLayerFlags(selection)
  const { saveFragment, undo, redo } = useBuilderDocument()

  useHotkeys('meta+s, ctrl+s', saveFragment, { scopes: [hotKeysScope.builder], preventDefault: true })

  useHotkeys('meta+z, ctrl+z', undo, { scopes: [hotKeysScope.builder], preventDefault: true })
  useHotkeys('meta+shift+z, ctrl+shift+z', redo, { scopes: [hotKeysScope.builder], preventDefault: true })

  useHotkeys(
    'meta+d, ctrl+d',
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
    'meta+;, ctrl+;',
    () => {
      layerFlags.toggleVisible()
    },
    { scopes: [hotKeysScope.builder] }
  )

  useHotkeys(
    'meta+enter, ctrl+enter',
    () => {
      if (layerFlags.canWrap) {
        layerFlags.wrapFrame()
      }
    },
    { scopes: [hotKeysScope.builder] }
  )

  useHotkeys(
    'meta+backspace, ctrl+backspace',
    () => {
      if (layerFlags.canRemoveWrapper) {
        layerFlags.removeWrapper()
      }
    },
    { scopes: [hotKeysScope.builder] }
  )
}
