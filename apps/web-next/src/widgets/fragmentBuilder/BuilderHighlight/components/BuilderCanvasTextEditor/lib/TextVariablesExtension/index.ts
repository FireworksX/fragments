import Mention from '@tiptap/extension-mention'
import suggestion from './suggestion'

export const TextVariablesExtension = Mention.configure({
  HTMLAttributes: {
    class: 'variable'
  },
  suggestion
})
