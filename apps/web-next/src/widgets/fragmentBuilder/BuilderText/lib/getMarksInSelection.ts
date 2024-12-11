import { Editor } from '@tiptap/react'

export const getMarksInSelection = (editor: Editor) => {
  const { from, to } = editor.state.selection // Диапазон выделения
  const marksWithAttributes = {}

  editor.state.doc.nodesBetween(from, to, node => {
    if (!node.marks) return // Пропускаем узлы без меток

    node.marks.forEach(mark => {
      const markName = mark.type.name
      const markAttrs = mark.attrs

      Object.entries(markAttrs ?? {}).forEach(([key, value]) => {
        if (typeof value === 'string' && value.length > 0) {
          marksWithAttributes[key] = value
        }
      })
    })
  })

  return marksWithAttributes
}
