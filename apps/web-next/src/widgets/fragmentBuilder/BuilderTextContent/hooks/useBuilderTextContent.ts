import { popoutsStore } from '@/shared/store/popouts.store'
import { cssVariableToLink, linkToCssVariable, objectToColorString } from '@fragmentsx/utils'
import { useLayerPropertyValue } from '@/shared/hooks/fragmentBuilder/useLayerPropertyVariable'
import { useBuilderTextField } from '@/shared/hooks/fragmentBuilder/useBuilderTextField'
import { definition, isVariableLink } from '@fragmentsx/definition'
import { useEditorState } from '@tiptap/react'
import { capitalize } from '@/shared/utils/capitalize'
import { TEXT_ATTRS } from '@/widgets/fragmentBuilder/BuilderText/hooks/useBuilderTextBase'
import { use } from 'react'
import { CanvasTextEditorContext } from '@/widgets/fragmentBuilder/BuilderHighlight'
import { entityOfKey } from '@graph-state/core'
import { useUpdateEffect } from 'react-use'
import { useLayerValue } from '@/shared/hooks/fragmentBuilder/useLayerValue'
import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'

export const useBuilderTextContent = () => {
  const editor = use(CanvasTextEditorContext)
  const { selection } = useBuilderSelection()
  const [content, setContent, contentInfo] = useLayerValue('content')

  const contentFromEditor = useEditorState({
    editor,
    selector: () => ({
      content: editor?.getHTML(),
      text: editor?.getText()
    })
  })

  const contentVariable = useLayerPropertyValue('content', {
    fieldValue: contentFromEditor.text?.startsWith('$')
      ? `${definition.nodes.Variable}:${contentFromEditor.text.slice(1).trim()}`
      : contentFromEditor.text,
    onSetValue: value => {
      if (value) {
        editor
          .chain()
          .focus()
          .setContent([
            {
              type: 'mention',
              attrs: { id: entityOfKey(value)?._id, mentionSuggestionChar: '$' }
            },
            {
              type: 'text',
              text: ' '
            }
          ])
          .run()

        // Object.entries(contentFromEditor).forEach(([key, state]) => {
        //   handleChangeValue(key, state.value)
        // })
      }
    }
  })

  useUpdateEffect(() => {
    if (selection) {
      editor.commands.setContent(content)
    }
  }, [selection])

  useUpdateEffect(() => {
    setContent(contentFromEditor.content)
  }, [contentFromEditor.content])

  return {
    ...contentVariable,
    value: contentFromEditor.text,
    onChange: value => {
      console.log('update', value)
      editor.commands.setContent(value)
    }
  }
}
