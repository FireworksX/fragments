import { FC, ReactNode, useContext } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { Color } from 'react-color'
import { useGraph } from '@graph-state/react'
import { POPOUT_TYPE, popoutsStore } from '@/app/store/popouts.store'
import { BuilderContext } from '@/builder/BuilderContext'
import { useDisplayColor } from '@/shared/hooks/fragmentBuilder/useDisplayColor'
import { Panel } from '@/shared/ui/Panel'
import { ColorPicker } from '@/shared/ui/ColorPicker'

export interface StackPanelColorPickerOptions {
  value?: Color
  onChange: (color: Color) => void
}

interface StackPanelColorPickerProps extends StackPanel {
  className?: string
  stackColors?: ReactNode
}

const StackPanelColorPicker: FC<StackPanelColorPickerProps> = ({ className, stackColors }) => {
  const { documentManager } = useContext(BuilderContext)
  const [popout] = useGraph(popoutsStore, `${POPOUT_TYPE}:colorPicker`)
  const context = popout.context ?? {}
  const { getColor } = useDisplayColor(documentManager)
  const [color] = useGraph(documentManager, context?.value)
  const resColor = color ?? context?.value

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
          color={getColor(resColor)}
          onChange={color => {
            if (color && context?.onChange) {
              updateColor(color.rgb)
            }
          }}
        />
      </Panel>

      {stackColors}
      {/*{!context?.withoutStack && (*/}
      {/*  <StackColors*/}
      {/*    getInitialColor={() => cloneColor(resColor)}*/}
      {/*    activeColorId={color?._id}*/}
      {/*    onSelect={value => {*/}
      {/*      updateColor(value)*/}
      {/*      popoutsStore.goPrev()*/}
      {/*    }}*/}
      {/*    onCreate={popoutsStore.goPrev}*/}
      {/*  />*/}
      {/*)}*/}
    </div>
  )
}

export default StackPanelColorPicker
