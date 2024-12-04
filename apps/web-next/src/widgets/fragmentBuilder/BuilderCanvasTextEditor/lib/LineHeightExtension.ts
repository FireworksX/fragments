import { Extension } from '@tiptap/core'

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

export const LineHeight = Extension.create<LineHeightOptions>({
  name: 'lineHeight',

  addOptions() {
    return {
      types: ['textStyle'],
      defaultHeight: null
    }
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          lineHeight: {
            default: this.options.defaultHeight,
            parseHTML: element => element.style.lineHeight?.replace(/['"]+/g, ''),
            renderHTML: attributes => {
              if (!attributes.lineHeight) {
                return {}
              }

              return {
                style: `line-height: ${attributes.lineHeight}`
              }
            }
          }
        }
      }
    ]
  },

  addCommands() {
    return {
      setLineHeight:
        height =>
        ({ chain }) =>
          chain().setMark('textStyle', { lineHeight: height }).run(),
      unsetLineHeight:
        () =>
        ({ commands }) =>
          commands.unsetMark(this.name)
    }
  }
})
