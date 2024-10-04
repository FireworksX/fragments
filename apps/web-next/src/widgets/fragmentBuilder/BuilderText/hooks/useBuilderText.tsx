import TextAlignLeft from '@/shared/icons/text-align-left.svg'
import TextAlignRight from '@/shared/icons/text-align-right.svg'
import TextAlignCenter from '@/shared/icons/text-align-center.svg'
import { useCallback, useContext, useEffect, useState } from 'react'
import { $isAtNodeEnd, $selectAll } from '@lexical/selection'
import { $createRangeSelection, $getRoot, $insertNodes, ElementNode, RangeSelection, TextNode } from 'lexical'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $getSelection, $isElementNode, $isRangeSelection, FORMAT_ELEMENT_COMMAND } from 'lexical'
import { mergeRegister } from '@lexical/utils'
import { $getSelectionStyleValueForProperty, $patchStyleText } from '@lexical/selection'
import { popoutsStore } from '@/app/store/popouts.store'
import { $generateHtmlFromNodes, $generateNodesFromDOM } from '@lexical/html'
import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'
import { useBuilderManager } from '@/shared/hooks/fragmentBuilder/useBuilderManager'
import { useLayerInvoker } from '@/shared/hooks/fragmentBuilder/useLayerInvoker'
import { useDisplayColor } from '@/shared/hooks/fragmentBuilder/useDisplayColor'
import { getSpringColor } from '@/shared/utils/getSpringColor'
import { TabsSelectorItem } from '@/shared/ui/TabsSelector'
import { fromPx } from '@/shared/utils/fromPx'
import { toPx } from '@/shared/utils/toPx'

const aligns: TabsSelectorItem[] = [
  {
    name: 'left',
    label: <TextAlignLeft width={16} height={16} />
  },
  {
    name: 'center',
    label: <TextAlignCenter width={16} height={16} />
  },
  {
    name: 'right',
    label: <TextAlignRight width={16} height={16} />
  }
]

const decorations: TabsSelectorItem[] = [
  {
    name: 'none',
    label: <span style={{ textDecoration: 'none' }}>Aa</span>
  },
  {
    name: 'underline',
    label: <span style={{ textDecoration: 'underline' }}>Aa</span>
  },
  {
    name: 'line-through',
    label: <span style={{ textDecoration: 'line-through' }}>Aa</span>
  }
]

const fonts: string[] = ['Inter', 'Roboto']
const weights = [
  { label: 'regular', value: 400 },
  { label: 'medium', value: 500 },
  { label: 'bold', value: 700 }
]
const transforms: TextTransform[] = ['none', 'uppercase', 'lowercase', 'capitalize']

export function getSelectedNode(selection: RangeSelection): TextNode | ElementNode {
  const anchor = selection.anchor
  const focus = selection.focus
  const anchorNode = selection.anchor.getNode()
  const focusNode = selection.focus.getNode()
  if (anchorNode === focusNode) {
    return anchorNode
  }
  const isBackward = selection.isBackward()
  if (isBackward) {
    return $isAtNodeEnd(focus) ? anchorNode : focusNode
  } else {
    return $isAtNodeEnd(anchor) ? anchorNode : focusNode
  }
}

export const useBuilderText = () => {
  const [editor] = useLexicalComposerContext()
  const { selection, selectionGraph } = useBuilderSelection()
  const { isTextEditing } = useBuilderManager()
  const layerInvoker = useLayerInvoker(selection, ({ node, key, value }) => {
    switch (key) {
      case 'content':
        node.setContent(value)
        break
    }
  })
  const fontInvoker = layerInvoker('text.font')
  const contentInvoker = layerInvoker('content')
  const [marks, setMarks] = useState({})
  const { getColor } = useDisplayColor()

  const updateSelection = useCallback(() => {
    const selection = $getSelection()

    if (selection) {
      const node = getSelectedNode(selection)
      const parent = node.getParent()

      let result: any = {
        'text-align': $isElementNode(node) ? node.getFormatType() : parent?.getFormatType() || 'left'
      }

      if ($isRangeSelection(selection)) {
        result = {
          ...result,
          'font-size': fromPx($getSelectionStyleValueForProperty(selection, 'font-size', toPx(14))),
          'font-weight': $getSelectionStyleValueForProperty(selection, 'font-weight', '400'),
          color: $getSelectionStyleValueForProperty(selection, 'color', '#000'),
          'text-decoration': $getSelectionStyleValueForProperty(selection, 'text-decoration', 'none'),
          'text-transform': $getSelectionStyleValueForProperty(selection, 'text-transform', 'none'),
          'line-height': Number($getSelectionStyleValueForProperty(selection, 'line-height', '1.2')),
          'letter-spacing': fromPx($getSelectionStyleValueForProperty(selection, 'letter-spacing', '0'))
        }
      }

      setMarks(result)
    }
  }, [])

  useEffect(() => {
    if (isTextEditing) {
      return mergeRegister(
        editor.registerUpdateListener(({ editorState }) => {
          editorState.read(() => {
            updateSelection()
            const htmlString = $generateHtmlFromNodes(editor)
            if (htmlString.length > 0) {
              contentInvoker.onChange(htmlString)
            }
          })
        })
      )
    }
  }, [editor, updateSelection, contentInvoker, isTextEditing])

  useEffect(() => {
    if (isTextEditing) {
      editor.update(() => {
        const parser = new DOMParser()
        const dom = parser.parseFromString(contentInvoker.value, 'text/html')
        const nodes = $generateNodesFromDOM(editor, dom)

        const root = $getRoot()
        root.clear()
        root.append(...nodes)
      })
    }
  }, [selection, isTextEditing])

  const openColor = () => {
    const currentColor = getSpringColor(marks.color || '#000')

    popoutsStore.open('colorPicker', {
      position: 'right',
      context: {
        value: currentColor,
        onChange: newColor => {
          onChangeValue('color', getColor(newColor).get())

          Object.entries(newColor).forEach(([key, value]) => {
            currentColor[key].set(value)
          })
        }
      },
      initial: true
    })
  }

  const openFonts = () => {
    // $openPopout('fonts', {
    //   context: {
    //     value: getSelectionValue('font', 'auto'),
    //     onChange: fontInvoker.onChange
    //   },
    //   initial: true
    // })
  }

  const onChangeValue = (key, value) => {
    const toPxKeys = ['font-size', 'letter-spacing']
    editor.update(() => {
      const selection = $getSelection()
      if ($isRangeSelection(selection)) {
        if (key === 'text-align') {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, value)
        } else {
          $patchStyleText(selection, {
            [key]: toPxKeys.includes(key) ? toPx(value) : value
          })
        }
      }
    })
  }

  return {
    content: layerInvoker('text.content'),
    font: {
      onClick: openFonts,
      ...layerInvoker('text.font')
    },
    weight: {
      items: weights,
      value: marks['font-weight'],
      onChange: value => onChangeValue('font-weight', value)
    },
    color: {
      value: marks['color'],
      onClick: openColor
    },
    align: {
      items: aligns,
      value: marks['text-align'],
      onChange: value => onChangeValue('text-align', value)
    },
    fontSize: {
      value: marks['font-size'],
      onChange: value => onChangeValue('font-size', value)
    },
    decoration: {
      items: decorations,
      value: marks['text-decoration'],
      onChange: value => onChangeValue('text-decoration', value)
    },
    transform: {
      items: transforms,
      value: marks['text-transform'],
      onChange: value => onChangeValue('text-transform', value)
    },
    lineHeight: {
      value: marks['line-height'],
      onChange: value => onChangeValue('line-height', value)
    },
    letterSpacing: {
      value: marks['letter-spacing'],
      onChange: value => onChangeValue('letter-spacing', value)
    }
  }
}
