import { Attribute, Extension, mergeAttributes } from '@tiptap/core'
import { createStyleExtension } from '@/widgets/fragmentBuilder/BuilderCanvasTextEditor/lib/createStyleExtension'

export interface TextDecorationOptions {
  types: string[] // Узлы, для которых применима метка (например, 'text')
  defaultDecoration: string | null // Значение по умолчанию
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    textDecoration: {
      /**
       * Установить text-decoration
       */
      setTextDecoration: (decoration: string) => ReturnType
      /**
       * Удалить text-decoration
       */
      unsetTextDecoration: () => ReturnType
    }
  }
}

export const TextDecoration = createStyleExtension({
  name: 'textDecoration',
  cssProperty: 'text-decoration'
})
