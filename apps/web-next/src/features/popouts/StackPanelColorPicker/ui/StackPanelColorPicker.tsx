import { FC, ReactNode, useContext } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { Color } from 'react-color'
import { useGraph } from '@graph-state/react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useDisplayColor } from '@/shared/hooks/fragmentBuilder/useDisplayColor'
import { Panel } from '@/shared/ui/Panel'
import { ColorPicker } from '@/shared/ui/ColorPicker'
import SolidPaintStyles from '../../../../entities/fragment/SolidPaintStyles/ui/SolidPaintStyles'
import { popoutNames } from '@/shared/data'
import { animatableValue } from '@/shared/utils/animatableValue'
import { getRandomColor } from '@/shared/utils/random'
import { isLinkKey, LinkKey } from '@graph-state/core'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { useStack } from '@/shared/hooks/useStack'

export interface StackPanelColorPickerOptions {
  value?: Color
  onChange: (color: Color) => void
}

interface StackPanelColorPickerProps extends StackPanel {
  className?: string
}

export const StackPanelColorPicker: FC<StackPanelColorPickerProps> = ({ className }) => {
  const { documentManager } = useBuilderDocument()
  const stack = useStack()
  const context = stack.readContext(popoutNames.colorPicker) ?? {}
  // const { getColor } = useDisplayColor(documentManager)
  const [color] = useGraph(documentManager, context?.value)
  const resColor = color ?? context?.value

  const updateColor = (color?: Color | LinkKey) => {
    if (color && context?.onChange) {
      context.onChange(color)
    }
  }

  return (
    <div className={cn(styles.root, className)}>
      <Panel>
        <ColorPicker
          color={resColor}
          onChange={color => {
            if (color && context?.onChange) {
              updateColor(color.rgb)
            }
          }}
        />
      </Panel>

      {!context?.withoutStack && (
        <SolidPaintStyles
          initialColor={resColor}
          activeColorKey={resColor}
          onSelect={updateColor}
          // onCreate={popoutsStore.goPrev}
        />
      )}

      {/*<SolidPaintStyles*/}
      {/*  getInitialColor={() => animatableValue(resColor)}*/}
      {/*  activeColorKey={isLinkKey(context?.value) ? context?.value : undefined}*/}
      {/*  onSelect={link => {*/}
      {/*    updateColor(link)*/}
      {/*    popoutsStore.goPrev()*/}
      {/*  }}*/}
      {/*  onCreate={popoutsStore.goPrev}*/}
      {/*/>*/}
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
