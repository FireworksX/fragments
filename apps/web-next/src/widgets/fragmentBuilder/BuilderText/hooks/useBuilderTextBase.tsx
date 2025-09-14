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
import { Editor, useEditorState } from '@tiptap/react'
import { generateHTML, generateText, generateJSON } from '@tiptap/core'
import { capitalize } from '@/shared/utils/capitalize'
import { isValue, objectToColorString, toKebabCase, cssVariableToLink, linkToCssVariable } from '@fragmentsx/utils'
import { useGraph } from '@graph-state/react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { definition } from '@fragmentsx/definition'
import { getMarksInSelection } from '../lib/getMarksInSelection'
import { getTopLevelNodeRanges } from '../lib/getTopLevelNodeRanges'
import { wrapTextInParagraphWithAttributes } from '../lib/wrapTextInParagraphWithAttributes'
import { isVariableLink } from '@/shared/utils/isVariableLink'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { useLayerValue } from '@/shared/hooks/fragmentBuilder/useLayerValue'
import { useLayerVariables } from '../../../../shared/hooks/fragmentBuilder/useLayerVariable'
import { useLayerPropertyValue } from '@/shared/hooks/fragmentBuilder/useLayerPropertyVariable'
import { useUpdateEffect } from 'react-use'
import { entityOfKey } from '@graph-state/core'

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

export const cleanHtmlContent = html => {
  if (!html) return ''

  // Создаем временный div для парсинга HTML
  const tempDiv = document.createElement('div')
  tempDiv.innerHTML = html

  // Извлекаем только текстовое содержимое
  return tempDiv.textContent || tempDiv.innerText || ''
}

const fonts: string[] = ['Inter', 'Roboto']
const weights = [
  { label: 'regular', value: 400 },
  { label: 'medium', value: 500 },
  { label: 'bold', value: 700 }
]
const transforms: TextTransform[] = ['none', 'uppercase', 'lowercase', 'capitalize']

export const useBuilderTextBase = () => {
  const editor = use(CanvasTextEditorContext)
  const { selection } = useBuilderSelection()
  const [content, setContent, contentInfo] = useLayerValue('content')
  const [whiteSpace, setWhiteSpace] = useLayerValue('whiteSpace')

  const openColor = () => {
    popoutsStore.open('colorPicker', {
      position: 'right',
      context: {
        value: editorState.color ?? '#000',
        onChange: newColor => {
          const color = objectToColorString(newColor)
          // setColor(color)
          handleChangeValue('color', color)
          // onChangeValue('color', color)
          // setAttributes({ color })
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

  const handleChangeValue = (key, value) => {
    editor.chain().focus()?.[`set${capitalize(key)}`]?.(value).run()
    // console.log(editor?.getHTML())
    // setAttributes({ [key]: value })
  }

  const handleResetValue = key => {
    editor.chain().focus()?.[`unset${capitalize(key)}`]?.().run()
  }

  const editorState = useEditorState({
    editor,
    // Селектор: эта функция запускается при каждом изменении в редакторе.
    // Она должна вернуть те значения, на которые мы хотим подписаться.
    selector: ctx => {
      const readValue = (field, defaulValue) => {
        const value = ctx.editor?.storage?.[field]?.[`get${capitalize(field)}`]?.({ editor })

        return {
          value: value?.at(0) ?? defaulValue,
          isMixed: value?.length > 1
        }
      }

      return {
        content: editor?.getHTML(),
        text: editor?.getText(),
        color: readValue('color', '#000'),
        fontSize: readValue('fontSize', 14),
        fontWeight: readValue('fontWeight', 400),
        textAlign: readValue('textAlign', 'left'),
        textDecoration: readValue('textDecoration', definition.textDecorations.none),
        textTransform: readValue('textTransform', definition.textTransform.none),
        lineHeight: readValue('lineHeight', 1.2),
        letterSpacing: readValue('letterSpacing', 0)
        // fontFamily: ctx.editor.getAttributes('textStyle').fontFamily || 'Inter',
      }
    }
  })

  const colorVariable = useLayerPropertyValue('text.color', {
    fieldValue: cssVariableToLink(editorState.color.value),
    onSetValue: value => {
      if (value) {
        handleChangeValue('color', linkToCssVariable(value))
      }
    },
    onResetVariable: () => {
      handleResetValue('color')
    }
  })

  const contentVariable = useLayerPropertyValue('content', {
    fieldValue: editorState.text?.startsWith('$') ? `${definition.nodes.Variable}:${editorState.text.slice(1)}` : null,
    onSetValue: value => {
      if (value) {
        editor
          .chain()
          .focus()
          .setContent([
            {
              type: 'mention',
              attrs: { id: entityOfKey(value)?._id, mentionSuggestionChar: '$' }
            },
            {
              type: 'text',
              text: ' '
            }
          ])
          .run()
      }
    },
    onResetVariable: () => {
      handleResetValue('color')
    }
  })

  useUpdateEffect(() => {
    if (selection) {
      editor.commands.setContent(content)
    }
  }, [selection])

  useUpdateEffect(() => {
    setContent(editorState.content)
  }, [editorState])

  return {
    content: {
      ...contentVariable,
      value: content,
      textContent: editorState.text
    },
    font: {
      onClick: openFonts
      // ...layerInvoker('text.font')
    },
    weight: {
      items: weights,
      value: editorState['fontWeight'].value,
      isMixed: editorState?.fontWeight?.isMixed,
      onChange: value => handleChangeValue('fontWeight', value)
    },
    color: {
      ...colorVariable,
      value: editorState.color.value ?? '#000',
      isMixed: editorState?.color?.isMixed,
      onClick: openColor
    },
    align: {
      items: aligns,
      value: editorState['textAlign'].value ?? 'left',
      onChange: value => handleChangeValue('textAlign', value)
    },
    fontSize: {
      value: 'fontSize' in editorState ? fromPx(editorState['fontSize'].value) : 14,
      isMixed: editorState?.fontSize?.isMixed,
      onChange: value => handleChangeValue('fontSize', toPx(value))
    },
    decoration: {
      items: decorations,
      value: editorState['textDecoration'].value ?? 'none',
      onChange: value => handleChangeValue('textDecoration', value)
    },
    transform: {
      items: transforms,
      value: editorState['textTransform']?.value ?? 'none',
      isMixed: editorState?.textTransform?.isMixed,
      onChange: value => handleChangeValue('textTransform', value)
    },
    lineHeight: {
      value: Number(editorState['lineHeight']?.value) ?? 1,
      isMixed: editorState?.lineHeight?.isMixed,
      onChange: value => handleChangeValue('lineHeight', value)
    },
    letterSpacing: {
      value: fromPx(editorState['letterSpacing']?.value) ?? 0,
      isMixed: editorState?.letterSpacing?.isMixed,
      onChange: value => handleChangeValue('letterSpacing', toPx(value))
    },
    whiteSpace: {
      options: Object.keys(definition.whiteSpace),
      value: whiteSpace,
      onChange: setWhiteSpace
      // ...layerInvoker('whiteSpace')
    }
  }
}
