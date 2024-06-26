import { TabsSelectorItem } from '../../../../../../../components/TabsSelector/TabsSelector'
import Icon from '../../../../../../../components/Icon/Icon'
import { useLayerInvoker } from '../../../../../../../hooks/useLayerInvoker'
import { TextTransform } from '../../../../../../../data/promos/creators/createText'
import { useStore } from '@nanostores/react'
import { $builderView, $statex } from '../../../../../../../store/builderRouterStore'
import { $openPopout } from '../../../../../../../store/popoutStore'
import { useStatex } from '@adstore/statex-react'

const aligns: TabsSelectorItem[] = [
  {
    name: 'left',
    label: <Icon name='text-align-left' width={16} height={16} />
  },
  {
    name: 'center',
    label: <Icon name='text-align-center' width={16} height={16} />
  },
  {
    name: 'right',
    label: <Icon name='text-align-right' width={16} height={16} />
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
  const statex = useStore($statex)
  const builderView = useStore($builderView)
  const richEditor = statex.richEditor
  const selectedMarks = useStatex(statex, richEditor.key, state => state.selectedMarks)
  const layerInvoker = useLayerInvoker('')
  const fontInvoker = layerInvoker('text.font')
  const contentInvoker = layerInvoker('text.content')

  const openColor = () => {
    $openPopout('colorPicker', {
      context: {
        value: getSelectionValue('color', '#000'),
        onChange: value => onChangeValue('color', value)
      },
      initial: true
    })
  }

  const openFonts = () => {
    $openPopout('fonts', {
      context: {
        value: getSelectionValue('font', 'auto'),
        onChange: fontInvoker.onChange
      },
      initial: true
    })
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
    enabled: builderView === 'text',
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
