import { ReactEditor } from 'slate-react'
import { createState, Entity, Plugin } from '@graph-state/core'
import isBrowser from '@/app/utils/isBrowser'
import { noop } from 'swr/_internal'
import { generateId } from '@fragments/utils'
import { getNodePosition } from '@/app/utils/getNodePosition'

const aa = [
  {
    type: 'paragraph',
    children: [
      {
        text: '10 000 РУБЛЕЙ',
        color: '#fc8c1c',
        fontSize: 16,
        weight: 'bold'
      }
    ]
  },
  {
    type: 'paragraph',
    children: [
      {
        text: 'бесплатная ставка',
        fontSize: 15,
        weight: 'bold'
      }
    ]
  },
  {
    type: 'paragraph',
    children: [
      {
        text: 'winline',
        color: '#a8a8a8'
      }
    ]
  }
]

const operationsForMarks = ['set_selection', 'set_node']

export const richTextPlugin: Plugin = state => {
  let slateEditor: ReactEditor
  const richTextKey = state.mutate({
    _type: 'RichText',
    _id: generateId(),
    selectedMarks: {}
  })

  const hideFromDOM = (node: HTMLElement) => {
    if (isBrowser) {
      if (node instanceof HTMLElement) {
        node.attributeStyleMap.set('opacity', 0)
        return () => node.attributeStyleMap.set('opacity', 1)
      }
    }

    return noop
  }

  const syncEntity = (inputEntity: Entity, renderNode: HTMLElement) => {
    const entity = state.resolve(inputEntity)
    const originalOnChange = slateEditor.onChange

    // slateEditor.children = state.resolveValue(inputEntity, 'content')
    const showElement = hideFromDOM(renderNode)

    slateEditor.onChange = options => {
      originalOnChange(options)

      if (options?.operation?.type !== 'set_selection') {
        entity.setContent(slateEditor.children ?? [])
      }

      if (operationsForMarks.includes(options?.operation?.type)) {
        state.mutate(
          richTextKey,
          {
            selectedMarks: slateEditor.getMarks()
          },
          { replace: true }
        )
      }
    }

    return () => {
      showElement()
    }
  }

  state.richEditor = {
    ...state.entityOfKey(richTextKey),
    key: richTextKey,
    setSlateEditor: editor => {
      slateEditor = editor
    },
    updateStyle: (styleKey: string, value) => {
      slateEditor.addMark(styleKey, value)
    },
    sync: syncEntity
  }

  return state
}
