import { use } from 'react'
import { CanvasTextEditorContext } from '@/widgets/fragmentBuilder/BuilderHighlight'
import { capitalize } from '@/shared/utils/capitalize'
import { TEXT_ATTRS } from '@/widgets/fragmentBuilder/BuilderText/hooks/useBuilderTextBase'
import { useEditorState } from '@tiptap/react'

export const useBuilderTextField = field => {
  const editor = use(CanvasTextEditorContext)

  const changeValue = value => {
    const methodName = `set${capitalize(field)}`
    const chain = editor.chain()?.focus()

    if (methodName in chain && field in TEXT_ATTRS) {
      chain?.[methodName]?.(value)?.run()
    }
  }

  const resetValue = () => {
    editor.chain().focus()?.[`unset${capitalize(field)}`]?.().run()
  }

  const fromEditor = useEditorState({
    editor,
    selector: ctx => {
      const value = ctx.editor?.storage?.[field]?.[`get${capitalize(field)}`]?.({ editor })

      return {
        value: value?.at(0),
        isMixed: value?.length > 1
      }
    }
  })

  return {
    ...fromEditor,
    changeValue,
    resetValue
  }
}
