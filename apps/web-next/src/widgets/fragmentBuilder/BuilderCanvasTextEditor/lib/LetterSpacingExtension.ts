import { Extension } from '@tiptap/core'

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

export const LetterSpacing = Extension.create<LetterSpacingOptions>({
  name: 'letterSpacing',

  addOptions() {
    return {
      types: ['textStyle'],
      defaultSpacing: null
    }
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          letterSpacing: {
            default: this.options.defaultSpacing,
            parseHTML: element => element.style.letterSpacing?.replace(/['"]+/g, ''),
            renderHTML: attributes => {
              if (!attributes.letterSpacing) {
                return {}
              }

              return {
                style: `letter-spacing: ${attributes.letterSpacing}`
              }
            }
          }
        }
      }
    ]
  },

  addCommands() {
    return {
      setLetterSpacing:
        spacing =>
        ({ chain }) =>
          chain().setMark('textStyle', { letterSpacing: spacing }).run(),
      unsetLetterSpacing:
        () =>
        ({ commands }) =>
          commands.unsetMark(this.name)
    }
  }
})
