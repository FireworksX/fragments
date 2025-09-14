import { Extension } from '@tiptap/core'

const collectDescendantChanges = (doc, from, to, attrName, changes) => {
  doc.nodesBetween(from, to, (descendantNode, descendantPos) => {
    // Для инлайновых нод
    if (descendantNode.isInline && descendantNode.attrs[attrName]) {
      changes.push({
        type: 'node',
        pos: descendantPos,
        attrs: { ...descendantNode.attrs, [attrName]: null }
      })
    }

    // Для текстовых марок
    if (descendantNode.isText) {
      collectMarkChanges(descendantNode, descendantPos, attrName, changes)
    }
  })
}

const collectMarkChanges = (node, nodePos, attrName, changes) => {
  const nodeStart = nodePos
  const nodeEnd = nodePos + node.nodeSize

  node.marks.forEach(mark => {
    if (mark.attrs[attrName]) {
      const newAttrs = { ...mark.attrs }
      delete newAttrs[attrName]

      // Добавляем удаление старой марки
      changes.push({
        type: 'mark',
        remove: true,
        from: nodeStart,
        to: nodeEnd,
        markType: mark.type
      })

      // Добавляем новую марку (если остались атрибуты)
      if (Object.keys(newAttrs).length > 0) {
        changes.push({
          type: 'mark',
          add: true,
          from: nodeStart,
          to: nodeEnd,
          newMark: mark.type.create(newAttrs)
        })
      }
    }
  })
}

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

            // Собираем все изменения сначала
            const changes = []
            let updated = false

            doc.descendants((node, pos) => {
              if (blockTypes.includes(node.type.name)) {
                changes.push({ type: 'node', pos, attrs: { ...node.attrs, [name]: value } })
                updated = true

                // Также собираем изменения для потомков
                const nodeEnd = pos + node.nodeSize
                collectDescendantChanges(doc, pos + 1, nodeEnd - 1, name, changes)
              }
            })

            // СОЗДАЕМ ТРАНЗАКЦИЮ ПРАВИЛЬНО
            // const transaction = editor.state.tr
            //
            // doc.descendants((node, pos) => {
            //   if (blockTypes.includes(node.type.name)) {
            //     transaction.setNodeMarkup(pos, undefined, {
            //       ...node.attrs,
            //       [name]: value
            //     })
            //     updated = true
            //   }
            //
            //   // 2.2. Находим всех потомков этой ноды и удаляем у них этот атрибут
            //   const nodeEnd = pos + node.nodeSize
            //
            //   // Рекурсивно проходим по всем потомкам
            //   doc.nodesBetween(pos + 1, nodeEnd - 1, (descendantNode, descendantPos) => {
            // Удаляем атрибут у инлайновых нод
            // if (descendantNode.isInline && descendantNode.attrs[name]) {
            //   transaction.setNodeMarkup(descendantPos, undefined, {
            //     ...descendantNode.attrs,
            //     [name]: null // Удаляем атрибут
            //   })
            // }
            // Удаляем соответствующие марки у текстовых нод
            // if (descendantNode.isText) {
            //   descendantNode.marks.forEach(mark => {
            //     if (mark.attrs[name]) {
            //       // Создаем новую марку без указанного атрибута
            //       const newAttrs = { ...mark.attrs }
            //       delete newAttrs[name] // Удаляем только нужный атрибут
            //
            //       // Если в марке остались другие атрибуты - обновляем её
            //       if (Object.keys(newAttrs).length > 0) {
            //         const newMark = mark.type.create(newAttrs)
            //         transaction.removeMark(descendantPos, descendantPos + descendantNode.nodeSize, mark.type)
            //         transaction.addMark(descendantPos, descendantPos + descendantNode.nodeSize, newMark)
            //       } else {
            //         // Если атрибутов не осталось - удаляем марку полностью
            //         transaction.removeMark(descendantPos, descendantPos + descendantNode.nodeSize, mark.type)
            //       }
            //     }
            //   })
            // }
            //   })
            // })

            // Создаем и применяем транзакцию только один раз
            if (updated) {
              const transaction = editor.state.tr

              changes.forEach(change => {
                if (change.type === 'node') {
                  transaction.setNodeMarkup(change.pos, undefined, change.attrs)
                } else if (change.type === 'mark') {
                  if (change.remove) {
                    transaction.removeMark(change.from, change.to, change.markType)
                  }
                  if (change.add && change.newMark) {
                    transaction.addMark(change.from, change.to, change.newMark)
                  }
                }
              })

              editor.view.dispatch(transaction)
              return true
            }

            // if (updated) {
            //   editor.view.dispatch(transaction)
            //   return true
            // }

            return false
          },

        [`unset${name.charAt(0).toUpperCase() + name.slice(1)}`]:
          () =>
          ({ chain, editor }) => {
            const { selection, doc } = editor.state

            // Если текст выделен, работаем с текстом
            if (!selection.empty) {
              return chain().unsetMark('textStyle').run()
            }

            const transaction = editor.state.tr
            let updated = false

            doc.descendants((node, pos) => {
              if (blockTypes.includes(node.type.name)) {
                transaction.setNodeMarkup(pos, undefined, {
                  ...node.attrs,
                  [name]: null
                })
                updated = true
              }

              // 2.2. Находим всех потомков этой ноды и удаляем у них этот атрибут
              const nodeEnd = pos + node.nodeSize

              // Рекурсивно проходим по всем потомкам
              doc.nodesBetween(pos + 1, nodeEnd - 1, (descendantNode, descendantPos) => {
                // Удаляем атрибут у инлайновых нод
                if (descendantNode.isInline && descendantNode.attrs[name]) {
                  transaction.setNodeMarkup(descendantPos, undefined, {
                    ...descendantNode.attrs,
                    [name]: null // Удаляем атрибут
                  })
                }

                // Удаляем соответствующие марки у текстовых нод
                if (descendantNode.isText) {
                  descendantNode.marks.forEach(mark => {
                    if (mark.attrs[name]) {
                      // Создаем новую марку без указанного атрибута
                      const newAttrs = { ...mark.attrs }
                      delete newAttrs[name] // Удаляем только нужный атрибут

                      // Если в марке остались другие атрибуты - обновляем её
                      if (Object.keys(newAttrs).length > 0) {
                        const newMark = mark.type.create(newAttrs)
                        transaction.removeMark(descendantPos, descendantPos + descendantNode.nodeSize, mark.type)
                        transaction.addMark(descendantPos, descendantPos + descendantNode.nodeSize, newMark)
                      } else {
                        // Если атрибутов не осталось - удаляем марку полностью
                        transaction.removeMark(descendantPos, descendantPos + descendantNode.nodeSize, mark.type)
                      }
                    }
                  })
                }
              })
            })

            if (updated) {
              editor.view.dispatch(transaction)
              return true
            }

            return false
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
              return [textStyleAttributes[name]]
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
