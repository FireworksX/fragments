import { Extension } from '@tiptap/core'

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

export const TextAlign = Extension.create<TextAlignOptions>({
  name: 'textAlign',

  addOptions() {
    return {
      types: ['textStyle'],
      defaultAlign: null
    }
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          textAlign: {
            default: this.options.defaultAlign,
            parseHTML: element => element.style.textAlign?.replace(/['"]+/g, ''),
            renderHTML: attributes => {
              if (!attributes.textAlign) {
                return {}
              }

              return {
                style: `text-align: ${attributes.textAlign}`
              }
            }
          }
        }
      }
    ]
  },

  addCommands() {
    return {
      setTextAlign:
        align =>
        ({ chain }) =>
          chain().setMark('textStyle', { textAlign: align }).run(),
      unsetTextAlign:
        () =>
        ({ commands }) =>
          commands.unsetMark(this.name)
    }
  }
})
