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
import { pick } from '@fragmentsx/utils'

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

export const useBuilderTextBase = () => {
  const editor = use(CanvasTextEditorContext)
  const [attributes, setAttributes] = useLayerValue('attributes')
  const [content, setContent, contentInfo] = useLayerValue('content')
  const contentVariable = useLayerVariables('content')

  const openColor = () => {
    const currentColor = attributes.color || '#000'

    popoutsStore.open('colorPicker', {
      position: 'right',
      context: {
        value: currentColor,
        onChange: newColor => {
          const color = objectToColorString(newColor)
          onChangeValue('color', color)
          setAttributes({ color })
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
    setAttributes({ [key]: value })
  }

  return {
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
      value: attributes['fontWeight'],
      onChange: value => onChangeValue('fontWeight', value)
    },
    color: {
      value: attributes['color'] ?? '#000',
      onClick: openColor
    },
    align: {
      items: aligns,
      value: attributes['textAlign'] ?? 'left',
      onChange: value => onChangeValue('textAlign', value)
    },
    fontSize: {
      value: 'fontSize' in attributes ? fromPx(attributes['fontSize']) : 14,
      onChange: value => onChangeValue('fontSize', toPx(value))
    },
    decoration: {
      items: decorations,
      value: attributes['textDecoration'] ?? 'none',
      onChange: value => onChangeValue('textDecoration', value)
    },
    transform: {
      items: transforms,
      value: attributes['textTransform'] ?? 'none',
      onChange: value => onChangeValue('textTransform', value)
    },
    lineHeight: {
      value: attributes['lineHeight'] ?? 1,
      onChange: value => onChangeValue('lineHeight', value)
    },
    letterSpacing: {
      value: fromPx(attributes['letterSpacing']) ?? 0,
      onChange: value => onChangeValue('letterSpacing', toPx(value))
    },
    whiteSpace: {
      options: Object.keys(definition.whiteSpace)
      // ...layerInvoker('whiteSpace')
    }
  }
}
