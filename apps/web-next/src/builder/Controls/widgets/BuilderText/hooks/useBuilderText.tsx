import { TabsSelectorItem } from '@/app/components/TabsSelector'
import TextAlignLeft from '@/app/svg/text-align-left.svg'
import TextAlignRight from '@/app/svg/text-align-right.svg'
import TextAlignCenter from '@/app/svg/text-align-center.svg'
import { useCallback, useContext, useEffect, useState } from 'react'
import { BuilderContext } from '@/builder/BuilderContext'
import { useGraph } from '@graph-state/react'
import { $isAtNodeEnd } from '@lexical/selection'
import { ElementNode, RangeSelection, TextNode } from 'lexical'
import { useLayerInvoker } from '@/builder/hooks/useLayerInvoker'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import {
  $getSelection,
  $isElementNode,
  $isRangeSelection,
  COMMAND_PRIORITY_CRITICAL,
  COMMAND_PRIORITY_HIGH,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  SELECTION_CHANGE_COMMAND
} from 'lexical'
import { mergeRegister } from '@lexical/utils'
import { useLexicalNodeSelection } from '@lexical/react/useLexicalNodeSelection'
import { $getSelectionStyleValueForProperty, $patchStyleText } from '@lexical/selection'
import { toPx } from '@/app/utils/toPx'
import { fromPx } from '@/app/utils/fromPx'
import { popoutsStore } from '@/app/store/popouts.store'
import { SpringValue } from '@react-spring/web'
import { useDisplayColor } from '@/builder/hooks/useDisplayColor'

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
  const { documentManager } = useContext(BuilderContext)
  const [richEditor] = useGraph(documentManager, documentManager.richEditor)
  const selectedMarks = richEditor.selectedMarks ?? []
  const layerInvoker = useLayerInvoker('')
  const fontInvoker = layerInvoker('text.font')
  const contentInvoker = layerInvoker('text.content')
  const [selection, setSelection] = useState()
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
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        console.log('uptdae')
        editorState.read(() => {
          updateSelection()
        })
      })
    )
  }, [editor, updateSelection])

  const openColor = () => {
    popoutsStore.open('colorPicker', {
      position: 'right',
      context: {
        value: { r: new SpringValue(0), g: new SpringValue(0), b: new SpringValue(0), a: new SpringValue(1) },
        onChange: newColor => {
          onChangeValue('color', getColor(newColor).get())
          // graphState.mutate(styleKey, {
          //   color: newColor
          // })
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

  const getSelectionValue = (key: string, fallbackValue: number) => {
    if ($isRangeSelection(selection)) {
      editor.read(() => {
        if (key === 'font-size') {
          const value = $getSelectionStyleValueForProperty(selection, key, fallbackValue)
          return fromPx(value)
        }
      })
    }
    // if (selectedMarks && key in selectedMarks) {
    //   return selectedMarks[key]
    // }
    //
    // return fallbackValue
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
