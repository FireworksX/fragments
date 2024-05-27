import { FC } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { StackPanel } from '../../hooks/useStackCollector'
import { Color } from 'react-color'
import StackColors from '../StackColors/StackColors'
import { useStore } from '@nanostores/react'
import ColorPicker from '@/app/builder/widgets/Builder/components/ColorPicker/ColorPicker'
import Panel from '@/app/builder/widgets/Builder/components/Panel/Panel'
import { useDisplayColor } from '@/app/builder/widgets/Builder/hooks/useDisplayColor'

export interface StackPanelColorPickerOptions {
  value?: Color
  withoutStack?: boolean
  onChange: (color: Color) => void
}

interface StackPanelColorPickerProps extends StackPanel {
  className?: string
}

const StackPanelColorPicker: FC<StackPanelColorPickerProps> = ({ className }) => {
  const selfContext = {} //useStore($getContextPopout('colorPicker'))
  const { getColor } = useDisplayColor()
  const color = selfContext?.value

  const updateColor = (color?: Color) => {
    if (color && selfContext?.onChange) {
      // $updateContextPopout('colorPicker', { value: color })
      selfContext.onChange(color)
    }
  }

  return (
    <div className={cn(styles.root, className)}>
      <Panel>
        <ColorPicker
          color={getColor(color)}
          onChange={color => {
            if (color && selfContext?.onChange) {
              updateColor(color.rgb)
            }
          }}
        />
      </Panel>

      {!selfContext?.withoutStack && (
        <StackColors
          initialColor={getColor(color)}
          activeColorId={color?._id}
          onSelect={value => updateColor(value)}
          // onCreate={$goPrevPopout}
        />
      )}
    </div>
  )
}

export default StackPanelColorPicker
