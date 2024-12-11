import { Extension } from '@tiptap/core'
import { createStyleExtension } from '@/widgets/fragmentBuilder/BuilderCanvasTextEditor/lib/createStyleExtension'

export interface LetterSpacingOptions {
  types: string[] // Узлы, для которых применима метка
  defaultSpacing: string | null // Значение по умолчанию
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    letterSpacing: {
      /**
       * Установить letter-spacing
       */
      setLetterSpacing: (spacing: string) => ReturnType
      /**
       * Удалить letter-spacing
       */
      unsetLetterSpacing: () => ReturnType
    }
  }
}

export const LetterSpacing = createStyleExtension({
  name: 'letterSpacing',
  cssProperty: 'letter-spacing'
})
