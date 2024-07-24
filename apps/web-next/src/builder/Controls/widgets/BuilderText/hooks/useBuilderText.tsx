import { TabsSelectorItem } from '@/app/components/TabsSelector'
import TextAlignLeft from '@/app/svg/text-align-left.svg'
import TextAlignRight from '@/app/svg/text-align-right.svg'
import TextAlignCenter from '@/app/svg/text-align-center.svg'
import { useContext } from 'react'
import { BuilderContext } from '@/builder/BuilderContext'
import { useGraph } from '@graph-state/react'
import { useLayerInvoker } from '@/builder/hooks/useLayerInvoker'

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
const weights: string[] = ['regular', 'medium', 'bold']
const transforms: TextTransform[] = ['none', 'uppercase', 'lowercase', 'capitalize']

export const useBuilderText = () => {
  const { documentManager } = useContext(BuilderContext)
  const [richEditor] = useGraph(documentManager, documentManager.richEditor)
  const selectedMarks = richEditor.selectedMarks ?? []
  const layerInvoker = useLayerInvoker('')
  const fontInvoker = layerInvoker('text.font')
  const contentInvoker = layerInvoker('text.content')

  const openColor = () => {
    // $openPopout('colorPicker', {
    //   context: {
    //     value: getSelectionValue('color', '#000'),
    //     onChange: value => onChangeValue('color', value)
    //   },
    //   initial: true
    // })
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
    richEditor.updateStyle(key, value)
  }

  const getSelectionValue = (key: string, fallbackValue: number) => {
    if (selectedMarks && key in selectedMarks) {
      return selectedMarks[key]
    }

    return fallbackValue
  }

  return {
    content: layerInvoker('text.content'),
    font: {
      onClick: openFonts,
      ...layerInvoker('text.font')
    },
    weight: {
      items: weights,
      value: getSelectionValue('fontSize', 'regular'),
      onChange: value => onChangeValue('weight', value)
    },
    color: {
      value: getSelectionValue('color', '#000'),
      onClick: openColor
    },
    fontSize: {
      value: getSelectionValue('fontSize', 14),
      onChange: value => onChangeValue('fontSize', value)
    },
    decoration: {
      items: decorations,
      value: getSelectionValue('decoration', 'none'),
      onChange: value => onChangeValue('decoration', value)
    },
    transform: {
      items: transforms,
      value: getSelectionValue('transform', 'none'),
      onChange: value => onChangeValue('transform', value)
    },
    lineHeight: {
      value: getSelectionValue('lineHeight', 1.4),
      onChange: value => onChangeValue('lineHeight', value)
    },
    letterSpacing: {
      value: getSelectionValue('letterSpacing', 0),
      onChange: value => onChangeValue('letterSpacing', value)
    }
  }
}
