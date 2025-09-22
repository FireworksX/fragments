import TextAlignLeft from '@/shared/icons/text-align-left.svg'
import TextAlignRight from '@/shared/icons/text-align-right.svg'
import TextAlignCenter from '@/shared/icons/text-align-center.svg'
import { use } from 'react'
import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'
import { TabsSelectorItem } from '@/shared/ui/TabsSelector'
import { fromPx } from '@/shared/utils/fromPx'
import { toPx } from '@/shared/utils/toPx'
import { CanvasTextEditorContext } from '@/widgets/fragmentBuilder/BuilderHighlight'
import { useEditorState } from '@tiptap/react'
import { capitalize } from '@/shared/utils/capitalize'
import { createConstants, cssVariableToLink, linkToCssVariable, objectToColorString } from '@fragmentsx/utils'
import { definition } from '@fragmentsx/definition'
import { useLayerValue } from '@/shared/hooks/fragmentBuilder/useLayerValue'
import { useLayerPropertyValue } from '@/shared/hooks/fragmentBuilder/useLayerPropertyVariable'
import { useUpdateEffect } from 'react-use'
import { entityOfKey } from '@graph-state/core'
import { useBuilderTextField } from '@/shared/hooks/fragmentBuilder/useBuilderTextField'

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
  { label: 'regular', value: '400' },
  { label: 'medium', value: '500' },
  { label: 'bold', value: '700' }
]
const transforms: TextTransform[] = ['none', 'uppercase', 'lowercase', 'capitalize']

export const TEXT_ATTRS = createConstants(
  'color',
  'fontSize',
  'fontWeight',
  'textAlign',
  'textDecoration',
  'textTransform',
  'lineHeight',
  'letterSpacing'
)

export const useBuilderTextBase = () => {
  const [whiteSpace, setWhiteSpace] = useLayerValue('whiteSpace')

  const fontSize = useBuilderTextField('fontSize', { fallback: 14 })
  const fontWeight = useBuilderTextField('fontWeight', { fallback: 400 })
  const textAlign = useBuilderTextField('textAlign', { fallback: 'left' })
  const textDecoration = useBuilderTextField('textDecoration', { fallback: definition.textDecorations.none })
  const textTransform = useBuilderTextField('textTransform', { fallback: definition.textTransform.none })
  const lineHeight = useBuilderTextField('lineHeight', { fallback: 1.2 })
  const letterSpacing = useBuilderTextField('letterSpacing', { fallback: 0 })

  const openFonts = () => {
    // $openPopout('fonts', {
    //   context: {
    //     value: getSelectionValue('font', 'auto'),
    //     onChange: fontInvoker.onChange
    //   },
    //   initial: true
    // })
  }

  return {
    font: {
      onClick: openFonts
      // ...layerInvoker('text.font')
    },
    weight: {
      items: weights,
      ...fontWeight
    },
    align: {
      items: aligns,
      ...textAlign
    },
    fontSize: {
      ...fontSize,
      value: fontSize.value ? fromPx(fontSize.value) : 14,
      changeValue: v => fontSize.changeValue(toPx(v))
    },
    decoration: {
      items: decorations,
      ...textDecoration
    },
    transform: {
      items: transforms,
      ...textTransform
    },
    lineHeight: {
      ...lineHeight,
      value: Number(lineHeight.value)
    },
    letterSpacing: {
      ...letterSpacing,
      value: fromPx(letterSpacing?.value) ?? 0,
      changeValue: v => letterSpacing.changeValue(toPx(v))
    },
    whiteSpace: {
      options: Object.keys(definition.whiteSpace),
      value: whiteSpace,
      onChange: setWhiteSpace
      // ...layerInvoker('whiteSpace')
    }
  }
}
