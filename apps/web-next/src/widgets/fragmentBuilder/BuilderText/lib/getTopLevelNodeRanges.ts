import { Editor, Range } from '@tiptap/react'

export const getTopLevelNodeRanges = (editor: Editor) => {
  if (!editor) return []

  const ranges: Range[] = []
  let pos = 0

  editor.state.doc.forEach((node, offset) => {
    const from = pos + 1 // Начало ноды (+1, т.к. диапазон в ProseMirror начинается с 1)
    const to = pos + node.nodeSize // Конец ноды (включая саму ноду)
    ranges.push({ node, from, to })
    pos += node.nodeSize // Сдвигаем позицию
  })

  return ranges
}
