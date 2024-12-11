import { Extension } from '@tiptap/core'

export const createStyleExtension = ({
  name,
  cssProperty,
  blockTypes = ['paragraph', 'heading', 'blockquote', 'listItem'],
  inlineTypes = ['textStyle']
}) => {
  return Extension.create({
    name,

    addOptions() {
      return {
        types: [...blockTypes, ...inlineTypes],
        blockTypes,
        inlineTypes,
        defaultValue: null
      }
    },

    addGlobalAttributes() {
      return this.options.types.map(type => ({
        types: [type],
        attributes: {
          [name]: {
            default: null,
            parseHTML: element => element.style[cssProperty]?.replace(/['"]+/g, ''),
            renderHTML: attributes => {
              if (!attributes[name]) {
                return {}
              }
              return {
                style: `${cssProperty}: ${attributes[name]}`
              }
            }
          }
        }
      }))
    },

    addCommands() {
      return {
        [`set${name.charAt(0).toUpperCase() + name.slice(1)}`]:
          (value: string) =>
          ({ chain, editor }) => {
            const { selection } = editor.state

            // Если текст выделен, работаем с текстом
            if (!selection.empty) {
              return chain()
                .setMark('textStyle', { [name]: value })
                .run()
            }

            // Если текст не выделен, обновляем стиль блочного узла (например, paragraph, heading и т.д.)
            const { $from } = selection
            const parentNodeType = $from.node($from.depth).type.name

            if (this.options.blockTypes.includes(parentNodeType)) {
              return chain()
                .updateAttributes(parentNodeType, { [name]: value })
                .run()
            }

            return false
          },

        [`unset${name.charAt(0).toUpperCase() + name.slice(1)}`]:
          () =>
          ({ chain }) => {
            return chain().unsetMark('textStyle').run()
          }
      }
    },

    addStorage() {
      return {
        [`get${name.charAt(0).toUpperCase() + name.slice(1)}`]: ({ editor }) => {
          const { selection } = editor.state

          // Проверяем выделенный текст
          if (!selection.empty) {
            const textStyleAttributes = editor.getAttributes('textStyle')
            if (textStyleAttributes[name]) {
              return textStyleAttributes[name]
            }
          }

          // Проверяем блочный узел (paragraph, heading и т.д.)
          const { $from } = selection
          const parentNodeType = $from.node($from.depth).type.name

          if (this.options.blockTypes.includes(parentNodeType)) {
            const blockAttributes = editor.getAttributes(parentNodeType)
            if (blockAttributes[name]) {
              return blockAttributes[name]
            }
          }

          // Если значение не найдено, возвращаем null
          return null
        }
      }
    }
  })
}
