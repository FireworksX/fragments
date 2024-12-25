import { createStyleExtension } from './createStyleExtension'

export interface FontSizeOptions {
  types: string[] // Узлы, для которых применима метка (например, 'text')
  defaultSize: string | null // Значение по умолчанию
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    fontSize: {
      /**
       * Установить размер шрифта
       */
      setFontSize: (size: string) => ReturnType
      /**
       * Удалить размер шрифта
       */
      unsetFontSize: () => ReturnType
    }
  }

  interface Storage {
    getFontSize(): string
  }
}

export const Color = createStyleExtension({
  name: 'color',
  cssProperty: 'color'
})
