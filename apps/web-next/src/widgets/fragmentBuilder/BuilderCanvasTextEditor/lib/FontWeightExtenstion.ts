import { Extension } from '@tiptap/core'

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

export const FontWeight = Extension.create<FontWeightOptions>({
  name: 'fontWeight',

  addOptions() {
    return {
      types: ['textStyle'],
      defaultWeight: null
    }
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontWeight: {
            default: this.options.defaultWeight,
            parseHTML: element => element.style.fontWeight?.replace(/['"]+/g, ''),
            renderHTML: attributes => {
              if (!attributes.fontWeight) {
                return {}
              }

              return {
                style: `font-weight: ${attributes.fontWeight}`
              }
            }
          }
        }
      }
    ]
  },

  addCommands() {
    return {
      setFontWeight:
        weight =>
        ({ chain }) =>
          chain().setMark('textStyle', { fontWeight: weight }).run(),
      unsetFontWeight:
        () =>
        ({ commands }) =>
          commands.unsetMark(this.name)
    }
  }
})
