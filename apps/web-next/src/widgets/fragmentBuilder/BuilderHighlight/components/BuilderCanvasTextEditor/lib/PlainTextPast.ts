// extensions/plain-text-paste.js
import { Extension } from '@tiptap/core'
import { PasteRule } from '@tiptap/pm/pasterules'

export const PlainTextPaste = Extension.create({
  name: 'plainTextPaste',

  addPasteRules() {
    return [
      // Правило, которое перехватывает ВСЮ вставку и преобразует в plain text
      new PasteRule({
        find: /[\s\S]*/, // matches absolutely everything
        handler: ({ state, range, match }) => {
          // Извлекаем plain text из буфера обмена
          const text = match[0]

          // Заменяем содержимое на plain text
          const { tr } = state
          tr.replaceWith(range.from, range.to, state.schema.text(text))
        }
      })
    ]
  }
})
