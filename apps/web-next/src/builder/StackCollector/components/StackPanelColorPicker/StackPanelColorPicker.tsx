import { FC, useContext } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { StackPanel } from '../../hooks/useStackCollector'
import { Color } from 'react-color'
import StackColors from '../StackColors/StackColors'
import { useGraph } from '@graph-state/react'
import { POPOUT_TYPE, popoutsStore } from '@/app/store/popouts.store'
import { builderStore } from '@/app/store/builder/builder.store'
import { useDisplayColor } from '@/builder/hooks/useDisplayColor'
import Panel from '@/builder/components/Panel/Panel'
import ColorPicker from '@/builder/components/ColorPicker/ColorPicker'
import { BuilderContext } from '@/builder/BuilderContext'
import { cloneColor } from '@/builder/utils/cloneColor'

export interface StackPanelColorPickerOptions {
  value?: Color
  withoutStack?: boolean
  onChange: (color: Color) => void
}

interface StackPanelColorPickerProps extends StackPanel {
  className?: string
}

const StackPanelColorPicker: FC<StackPanelColorPickerProps> = ({ className }) => {
  const { documentManager } = useContext(BuilderContext)
  const [popout] = useGraph(popoutsStore, `${POPOUT_TYPE}:colorPicker`)
  const context = popout.context ?? {}
  const { getColor } = useDisplayColor(documentManager)
  const [color] = useGraph(documentManager, context?.value)
  const resultColor = color ?? (context?.value as Color)

  console.log(resultColor, context)

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
          getInitialColor={() => cloneColor(color)}
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
