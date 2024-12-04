import { Attribute, Extension, mergeAttributes } from '@tiptap/core'

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

export const TextTransform = Extension.create<TextTransformOptions>({
  name: 'textTransform',

  addOptions() {
    return {
      types: ['textStyle'],
      defaultTransform: null
    }
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          textTransform: {
            default: this.options.defaultTransform,
            parseHTML: element => element.style.textTransform?.replace(/['"]+/g, ''),
            renderHTML: attributes => {
              if (!attributes.textTransform) {
                return {}
              }

              return {
                style: `text-transform: ${attributes.textTransform}`
              }
            }
          }
        }
      }
    ]
  },

  addCommands() {
    return {
      setTextTransform:
        transform =>
        ({ chain }) =>
          chain().setMark('textStyle', { textTransform: transform }).run(),
      unsetTextTransform:
        () =>
        ({ commands }) => {
          return commands.unsetMark(this.name)
        }
    }
  }
})
