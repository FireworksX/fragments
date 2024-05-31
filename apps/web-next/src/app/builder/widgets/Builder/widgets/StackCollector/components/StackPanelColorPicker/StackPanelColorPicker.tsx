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
import { useGraph } from '@graph-state/react'
import { POPOUT_TYPE, popoutsStore } from '@/app/stories/popouts.store'
import { builderStore } from '@/app/stories/builder.store'

export interface StackPanelColorPickerOptions {
  value?: Color
  withoutStack?: boolean
  onChange: (color: Color) => void
}

interface StackPanelColorPickerProps extends StackPanel {
  className?: string
}

const StackPanelColorPicker: FC<StackPanelColorPickerProps> = ({ className }) => {
  const [popout] = useGraph(popoutsStore, `${POPOUT_TYPE}:colorPicker`)
  const context = popout.context ?? {}
  const { getColor } = useDisplayColor()
  const [color] = useGraph(builderStore, context?.value)

  const updateColor = (color?: Color) => {
    if (color && context?.onChange) {
      // $updateContextPopout('colorPicker', { value: color })
      context.onChange(color)
    }
  }

  return (
    <div className={cn(styles.root, className)}>
      <Panel>
        <ColorPicker
          color={getColor(color)}
          onChange={color => {
            if (color && context?.onChange) {
              updateColor(color.rgb)
            }
          }}
        />
      </Panel>

      {!context?.withoutStack && (
        <StackColors
          initialColor={getColor(color)}
          activeColorId={color?._id}
          onSelect={value => {
            updateColor(value)
            popoutsStore.goPrev()
          }}
          onCreate={popoutsStore.goPrev}
        />
      )}
    </div>
  )
}

export default StackPanelColorPicker
