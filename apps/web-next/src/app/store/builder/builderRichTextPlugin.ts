import { ReactEditor } from 'slate-react'
import { createState, Entity, LinkKey, Plugin } from '@graph-state/core'
import isBrowser from '@/app/utils/isBrowser'
import { noop } from 'swr/_internal'
import { generateId } from '@fragments/utils'
import { getNodePosition } from '@/app/utils/getNodePosition'
import { findRefNode } from '@/builder/utils/findRefNode'

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
  const richTextKey = state.keyOfEntity({
    _type: 'RichText',
    _id: generateId()
  })
  const syncedNodes = new Set<LinkKey>([])

  const handleMountEditor = (editor: ReactEditor) => {
    slateEditor = editor
    const originalOnChange = slateEditor.onChange

    slateEditor.onChange = options => {
      syncedNodes.forEach(link => {
        const entity = state.resolve(link)

        if (options?.operation?.type !== 'set_selection') {
          entity.setContent(slateEditor.children ?? [])
        }

        if (operationsForMarks.includes(options?.operation?.type)) {
          state.mutate(
            richTextKey,
            prev => ({
              ...prev,
              selectedMarks: slateEditor.getMarks()
            }),
            { replace: true }
          )
        }
      })
      originalOnChange(options)
    }
  }

  const hideFromDOM = (node: HTMLElement) => {
    if (isBrowser) {
      if (node instanceof HTMLElement) {
        node.attributeStyleMap.set('opacity', 0)
        return () => node.attributeStyleMap.set('opacity', 1)
      }
    }

    return noop
  }

  const setEditable = (value?: boolean) => {
    state.mutate(richTextKey, {
      editable: value ?? false
    })
  }

  const syncEntity = (inputEntity: Entity) => {
    setEditable(true)
    const showElement = hideFromDOM(findRefNode(inputEntity))
    syncedNodes.add(inputEntity)
    console.log(state.resolve(inputEntity))
    // slateEditor.children = state.resolve(inputEntity).content

    return () => {
      showElement()
      setEditable(false)
      syncedNodes.delete(inputEntity)
    }
  }

  state.mutate(richTextKey, {
    selectedMarks: {},
    editable: false,
    setSlateEditor: handleMountEditor,
    updateStyle: (styleKey: string, value) => {
      slateEditor.addMark(styleKey, value)
    },
    setEditable,
    sync: syncEntity
  })
  state.richEditor = richTextKey

  return state
}
