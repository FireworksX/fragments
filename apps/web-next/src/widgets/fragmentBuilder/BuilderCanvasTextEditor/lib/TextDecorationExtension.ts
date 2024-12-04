import { Attribute, Extension, mergeAttributes } from '@tiptap/core'

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

export const TextDecoration = Extension.create<TextDecorationOptions>({
  name: 'textDecoration',

  addOptions() {
    return {
      types: ['textStyle'],
      defaultDecoration: null
    }
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          textDecoration: {
            default: this.options.defaultDecoration,
            parseHTML: element => element.style.textDecoration?.replace(/['"]+/g, ''),
            renderHTML: attributes => {
              if (!attributes.textDecoration) {
                return {}
              }

              return {
                style: `text-decoration: ${attributes.textDecoration}`
              }
            }
          }
        }
      }
    ]
  },

  addCommands() {
    return {
      setTextDecoration:
        decoration =>
        ({ chain }) =>
          chain().setMark('textStyle', { textDecoration: decoration }).run(),
      unsetTextDecoration:
        () =>
        ({ commands }) => {
          return commands.unsetMark(this.name)
        }
    }
  }
})
