import TextAlignLeft from '@/shared/icons/text-align-left.svg'
import TextAlignRight from '@/shared/icons/text-align-right.svg'
import TextAlignCenter from '@/shared/icons/text-align-center.svg'
import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { popoutsStore } from '@/shared/store/popouts.store'
import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'
import { useBuilderManager } from '@/shared/hooks/fragmentBuilder/useBuilderManager'
import { useLayerInvoker } from '@/shared/hooks/fragmentBuilder/useLayerInvoker'
import { useDisplayColor } from '@/shared/hooks/fragmentBuilder/useDisplayColor'
import { getSpringColor } from '@/shared/utils/getSpringColor'
import { TabsSelectorItem } from '@/shared/ui/TabsSelector'
import { fromPx } from '@/shared/utils/fromPx'
import { toPx } from '@/shared/utils/toPx'
import { canvasEditorExtensions, CanvasTextEditorContext } from '@/widgets/fragmentBuilder/BuilderCanvasTextEditor'
import { Editor } from '@tiptap/react'
import { generateHTML, generateText, generateJSON } from '@tiptap/core'
import { capitalize } from '@/shared/utils/capitalize'
import { objectToColorString } from '@fragments/utils'
import { useGraph } from '@graph-state/react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { whiteSpace } from '@fragments/plugin-fragment'

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

const getMarksInSelection = (editor: Editor) => {
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

export const useBuilderText = () => {
  const { builderManager } = useContext(BuilderContext)
  const editor = useContext(CanvasTextEditorContext)
  const { selection, selectionGraph } = useBuilderSelection()
  const { isTextEditing } = useBuilderManager()
  const [{ showTextEditor }] = useGraph(builderManager, builderManager.key)
  const lastSelectionRef = useRef<any | null>(null)

  const layerInvoker = useLayerInvoker(selection, ({ node, key, value }) => {
    switch (key) {
      case 'content':
        node.setContent(value)
        break
      case 'whiteSpace':
        node.setWhiteSpace(value)
        break
    }
  })
  const fontInvoker = layerInvoker('text.font')
  const contentInvoker = layerInvoker('content')
  const [marks, setMarks] = useState({})

  useEffect(() => {
    const selectionHandler = ({ editor }) => {
      setMarks(getMarksInSelection(editor))
    }
    const updateHandler = ({ editor }) => {
      contentInvoker.onChange(generateHTML(editor.getJSON(), canvasEditorExtensions))
    }

    if (editor) {
      editor.on('update', updateHandler)

      if (isTextEditing) {
        editor.on('selectionUpdate', selectionHandler)
      }
    }

    return () => {
      if (editor) {
        editor.off('selectionUpdate', selectionHandler)
        editor.off('update', updateHandler)
      }
    }
  }, [selection, isTextEditing, contentInvoker, editor])

  useEffect(() => {
    if (!isTextEditing && editor) {
      editor.commands.setContent(contentInvoker.value)
    }
  }, [isTextEditing, contentInvoker, editor])

  const openColor = () => {
    const currentColor = marks.color || '#000'
    lastSelectionRef.current = editor.state.selection

    popoutsStore.open('colorPicker', {
      position: 'right',
      context: {
        value: currentColor,
        onChange: newColor => {
          onChangeValue('color', objectToColorString(newColor))
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
    const methodName = `set${capitalize(key)}`

    if (methodName in editor.chain()) {
      if (showTextEditor) {
        if (lastSelectionRef.current) {
          editor
            .chain()
            .focus()
            .setTextSelection({ from: lastSelectionRef.current.from, to: lastSelectionRef.current.to })
            [methodName](value)
            .run()
        } else {
          editor.chain().focus()[methodName](value).run()
        }
      } else {
        editor.chain().selectAll().focus()[methodName](value).run()
      }
    }

    setMarks(p => ({
      ...p,
      [key]: value
    }))
  }

  return {
    isTextEditing,
    content: {
      ...contentInvoker,
      textContent: editor
        ? generateText(generateJSON(contentInvoker.value, canvasEditorExtensions), canvasEditorExtensions)
        : ''
    },
    font: {
      onClick: openFonts,
      ...layerInvoker('text.font')
    },
    weight: {
      items: weights,
      value: marks['fontWeight'],
      onChange: value => onChangeValue('fontWeight', value)
    },
    color: {
      value: marks['color'] ?? '#000',
      onClick: openColor
    },
    align: {
      items: aligns,
      value: marks['textAlign'] ?? 'left',
      onChange: value => onChangeValue('textAlign', value)
    },
    fontSize: {
      value: 'fontSize' in marks ? fromPx(marks['fontSize']) : 14,
      onChange: value => onChangeValue('fontSize', toPx(value))
    },
    decoration: {
      items: decorations,
      value: marks['textDecoration'] ?? 'none',
      onChange: value => onChangeValue('textDecoration', value)
    },
    transform: {
      items: transforms,
      value: marks['textTransform'] ?? 'none',
      onChange: value => onChangeValue('textTransform', value)
    },
    lineHeight: {
      value: marks['lineHeight'] ?? 1,
      onChange: value => onChangeValue('lineHeight', value)
    },
    letterSpacing: {
      value: fromPx(marks['letterSpacing']) ?? 0,
      onChange: value => onChangeValue('letterSpacing', toPx(value))
    },
    whiteSpace: {
      options: Object.keys(whiteSpace),
      ...layerInvoker('whiteSpace')
    }
  }
}
