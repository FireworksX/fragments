import { Attribute, Extension, mergeAttributes } from '@tiptap/core'
import { createStyleExtension } from '@/widgets/fragmentBuilder/BuilderCanvasTextEditor/lib/createStyleExtension'

export interface TextTransformOptions {
  types: string[] // Узлы, для которых применима метка (например, 'text')
  defaultTransform: string | null // Значение по умолчанию
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    textTransform: {
      /**
       * Установить text-transform
       */
      setTextTransform: (transform: string) => ReturnType
      /**
       * Удалить text-transform
       */
      unsetTextTransform: () => ReturnType
    }
  }
}

export const TextTransform = createStyleExtension({
  name: 'textTransform',
  cssProperty: 'text-transform'
})
