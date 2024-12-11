import { Extension } from '@tiptap/core'
import { createStyleExtension } from '@/widgets/fragmentBuilder/BuilderCanvasTextEditor/lib/createStyleExtension'

export interface TextAlignOptions {
  types: string[] // Узлы, для которых применима метка
  defaultAlign: string | null // Значение по умолчанию
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    textAlign: {
      /**
       * Установить text-align
       */
      setTextAlign: (align: string) => ReturnType
      /**
       * Удалить text-align
       */
      unsetTextAlign: () => ReturnType
    }
  }
}

export const TextAlign = createStyleExtension({
  name: 'textAlign',
  cssProperty: 'text-align'
})
