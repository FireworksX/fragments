import TextAlignLeft from '@/shared/icons/text-align-left.svg'
import TextAlignRight from '@/shared/icons/text-align-right.svg'
import TextAlignCenter from '@/shared/icons/text-align-center.svg'
import { use, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { popoutsStore } from '@/shared/store/popouts.store'
import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'
import { useBuilderManager } from '@/shared/hooks/fragmentBuilder/useBuilderManager'
import { useLayerInvoker } from '@/shared/hooks/fragmentBuilder/useLayerInvoker'
import { useDisplayColor } from '@/shared/hooks/fragmentBuilder/useDisplayColor'
import { getSpringColor } from '@/shared/utils/getSpringColor'
import { TabsSelectorItem } from '@/shared/ui/TabsSelector'
import { fromPx } from '@/shared/utils/fromPx'
import { toPx } from '@/shared/utils/toPx'
import { canvasEditorExtensions, CanvasTextEditorContext } from '@/widgets/fragmentBuilder/BuilderHighlight'
import { Editor } from '@tiptap/react'
import { generateHTML, generateText, generateJSON } from '@tiptap/core'
import { capitalize } from '@/shared/utils/capitalize'
import { isValue, objectToColorString, toKebabCase } from '@fragments/utils'
import { useGraph } from '@graph-state/react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { definition } from '@fragments/definition'
import { getMarksInSelection } from '../lib/getMarksInSelection'
import { getTopLevelNodeRanges } from '../lib/getTopLevelNodeRanges'
import { wrapTextInParagraphWithAttributes } from '../lib/wrapTextInParagraphWithAttributes'
import { isVariableLink } from '@/shared/utils/isVariableLink'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { useLayerValue } from '@/shared/hooks/fragmentBuilder/useLayerValue'
import { useLayerVariables } from '@/shared/hooks/fragmentBuilder/useLayerVariables'
import { useBuilderDocumentManager } from '@/shared/hooks/fragmentBuilder/useBuilderDocumentManager'

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

export const useBuilderText = () => {
  const { builderManager } = use(BuilderContext)
  const { documentManager } = useBuilderDocument()
  const editor = use(CanvasTextEditorContext)
  const { selection } = useBuilderSelection()
  const { isTextEditing } = useBuilderManager()
  const [{ showTextEditor }] = useGraph(builderManager, builderManager.key)
  const lastSelectionRef = useRef<any | null>(null)

  const [attributes, setAttributes] = useLayerValue('attributes')
  const [content, setContent, contentInfo] = useLayerValue('content')
  const textContent = '' //useTextContent(selection, documentManager)
  const [opacity, setOpacity] = useLayerValue('opacity')
  const saveOpacity = useRef<number | null>(null)
  const [marks, setMarks] = useState({})
  const contentVariable = useLayerVariables('content')

  useEffect(() => {
    const selectionHandler = ({ editor }) => {
      // setMarks(getMarksInSelection(editor))
    }
    const updateHandler = ({ editor }) => {
      const contentHtml = generateHTML(editor.getJSON(), canvasEditorExtensions)
      if (!contentInfo.isVariable) {
        setContent(contentHtml)
      }

      const attributes = editor.getAttributes('paragraph')
      setAttributes(attributes)
      // console.log(attributes)
      // styleAttributesInvoker.onChange(attributes)
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
  }, [selection, isTextEditing, editor, contentInfo])

  useEffect(() => {
    setMarks(getMarksInSelection(editor))
  }, [selection, editor])

  useEffect(() => {
    if (!isTextEditing && editor) {
      // if (isVariableLink(contentInvoker.value)) {
      //   content = selectionGraph?.getContent?.()
      // }
      editor.commands.setContent(textContent)
    }
  }, [isTextEditing, textContent, editor])

  useEffect(() => {
    if (isTextEditing) {
      saveOpacity.current = opacity
      setOpacity(0)
    } else if (saveOpacity.current) {
      setOpacity(saveOpacity.current)
    }

    return () => {
      if (saveOpacity.current) {
        setOpacity(saveOpacity.current)
      }
    }
  }, [isTextEditing])

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
        getTopLevelNodeRanges(editor).forEach(range => {
          editor.chain().focus().setTextSelection({ from: range.from, to: range.to })[methodName](value).run()
        })
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
      ...contentVariable,
      value: content,
      textContent:
        editor && content ? generateText(generateJSON(content, canvasEditorExtensions), canvasEditorExtensions) : '',
      update: setContent
    },
    font: {
      onClick: openFonts
      // ...layerInvoker('text.font')
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
      options: Object.keys(definition.whiteSpace)
      // ...layerInvoker('whiteSpace')
    }
  }
}
