import { createStyleExtension } from './createStyleExtension'

export interface FontWeightOptions {
  types: string[] // Узлы, для которых применима метка
  defaultWeight: string | null // Значение по умолчанию
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    fontWeight: {
      /**
       * Установить font-weight
       */
      setFontWeight: (weight: string) => ReturnType
      /**
       * Удалить font-weight
       */
      unsetFontWeight: () => ReturnType
    }
  }
}

export const FontWeight = createStyleExtension({
  name: 'fontWeight',
  cssProperty: 'font-weight'
})
