import { createStyleExtension } from './createStyleExtension'

export interface LineHeightOptions {
  types: string[] // Узлы, для которых применима метка
  defaultHeight: string | null // Значение по умолчанию
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    lineHeight: {
      /**
       * Установить line-height
       */
      setLineHeight: (height: string) => ReturnType
      /**
       * Удалить line-height
       */
      unsetLineHeight: () => ReturnType
    }
  }
}

export const LineHeight = createStyleExtension({
  name: 'lineHeight',
  cssProperty: 'line-height'
})
