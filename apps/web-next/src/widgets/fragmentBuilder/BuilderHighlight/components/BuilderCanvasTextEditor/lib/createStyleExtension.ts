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
            const { selection, doc } = editor.state

            // Если текст выделен, работаем с текстом
            if (!selection.empty) {
              return chain()
                .setMark('textStyle', { [name]: value })
                .run()
            }

            // Если текст не выделен, обновляем стиль блочного узла (например, paragraph, heading и т.д.)
            const { $from } = selection
            const parentNodeType = $from.node($from.depth).type.name

            // СОЗДАЕМ ТРАНЗАКЦИЮ ПРАВИЛЬНО
            const transaction = editor.state.tr

            let updated = false

            doc.descendants((node, pos) => {
              if (blockTypes.includes(node.type.name)) {
                transaction.setNodeMarkup(pos, undefined, {
                  ...node.attrs,
                  [name]: value
                })
                updated = true
              }
            })

            if (updated) {
              editor.view.dispatch(transaction)
              return true
            }

            // console.log(doc, selection)
            // blockTypes.forEach(type => {
            //   chain()
            //     .updateAttributes(type, { [name]: value })
            //     .run()
            // })

            // if (this.options.blockTypes.includes(parentNodeType)) {
            //   // Находим границы текущего родительского узла
            //   const parentStart = $from.before($from.depth)
            //   const parentEnd = $from.after($from.depth)
            //
            //   let transaction = editor.state.tr
            //
            //   doc.descendants((node, pos) => {
            //     if (blockTypes.includes(node.type.name)) {
            //       console.log(node, pos, transaction)
            //
            //       // Обновляем атрибуты для каждой найденной ноды
            //       // transaction = transaction.setNodeMarkup(pos, null, {
            //       //   ...node.attrs,
            //       //   [name]: value
            //       // })
            //     }
            //   })
            //
            //   // Проходим через все ноды внутри родительского узла
            //   // editor.state.doc.nodesBetween(parentStart, parentEnd, (node, pos) => {
            //   //   console.log(parentStart, parentEnd, node, pos)
            //   //   return chain()
            //   //     .updateAttributes(pos, { [name]: value })
            //   //     .run()
            //   //   // if (node.type.name === parentNodeType) {
            //   //   //   transaction = transaction.setNodeMarkup(pos, null, {
            //   //   //     ...node.attrs,
            //   //   //     [name]: value
            //   //   //   })
            //   //   // }
            //   // })
            //
            //   // console.log(transaction)
            //
            //   editor.view.dispatch(transaction)
            //   return true
            // }
            // if (this.options.blockTypes.includes(parentNodeType)) {
            //   return chain()
            //     .updateAttributes(parentNodeType, { [name]: value })
            //     .run()
            // }

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
          const { selection, doc } = editor.state

          const values = new Set()
          const checkedNodes = new Set()

          const addValue = value => {
            if (value !== undefined && value !== null && value !== '') {
              values.add(value)
            }
          }

          // Проверяем выделенный текст
          if (!selection.empty) {
            const textStyleAttributes = editor.getAttributes('textStyle')
            if (textStyleAttributes[name]) {
              return textStyleAttributes[name]
            }
          }

          // Текущая нода
          addValue(selection.$from.parent.attrs[name])

          // 2. Выборочная проверка документа (только релевантные типы нод)
          doc.descendants(node => {
            // Пропускаем уже проверенные ноды
            if (checkedNodes.has(node)) return

            // Проверяем только ноды, которые могут содержать нужный атрибут
            const nodeSpec = node.type.spec
            if (nodeSpec.attrs && nodeSpec.attrs[name] !== undefined) {
              addValue(node.attrs[name])
              checkedNodes.add(node)
            }

            // Проверяем дочерние ноды
            if (node.content) {
              node.content.forEach(childNode => {
                const childSpec = childNode.type.spec
                if (childSpec.attrs && childSpec.attrs[name] !== undefined) {
                  addValue(childNode.attrs[name])
                  checkedNodes.add(childNode)
                }
              })
            }

            // Проверяем марки в текстовых нодах
            if (node.isText) {
              node.marks.forEach(mark => {
                const markSpec = mark.type.spec
                if (markSpec.attrs && markSpec.attrs[name] !== undefined) {
                  addValue(mark.attrs[name])
                }
              })
            }
          })

          return Array.from(values)

          // // Проверяем блочный узел (paragraph, heading и т.д.)
          // const { $from } = selection
          // const parentNodeType = $from.node($from.depth).type.name
          //
          // if (this.options.blockTypes.includes(parentNodeType)) {
          //   const blockAttributes = editor.getAttributes(parentNodeType)
          //   if (blockAttributes[name]) {
          //     return blockAttributes[name]
          //   }
          // }
          //
          // // Если значение не найдено, возвращаем null
          // return null
        }
      }
    }
  })
}
