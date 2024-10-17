import { FC, ReactNode, useContext, useEffect } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { popoutsStore } from '@/shared/store/popouts.store'
import { animated, to } from '@react-spring/web'
import { TabsSelector, TabsSelectorItem } from '@/shared/ui/TabsSelector'
import { animatableValue } from '@/shared/utils/animatableValue'
import { AnimatedVisible } from '@/shared/ui/AnimatedVisible'
import { Panel } from '@/shared/ui/Panel'
import { ColorPicker } from '@/shared/ui/ColorPicker'
import { ImagePicker } from '@/features/fragmentBuilder/ImagePicker'
import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'
import { useLayerInvoker } from '@/shared/hooks/fragmentBuilder/useLayerInvoker'
import { getRandomColor } from '@/shared/utils/random'
import { SolidPaintStyles } from '@/entities/fragment/SolidPaintStyles'
import { paintMode } from '@fragments/plugin-state'

export interface StackPanelFillOptions {}

interface StackPanelFillProps {
  className?: string
  stackColors?: ReactNode
}

const tabs: TabsSelectorItem[] = [
  {
    name: paintMode.Solid,
    label: 'Solid'
  },
  {
    name: paintMode.Image,
    label: 'Image'
  }
]

const StackPanelFill: FC<StackPanelFillProps> = ({ className, stackColors }) => {
  const { selection, selectionGraph } = useBuilderSelection()
  const layerInvoker = useLayerInvoker(selection, ({ key, prevValue, documentManager, value, node }) => {
    switch (key) {
      case 'solidFill':
        node.setSolidFill(value)
        break
      case 'imageFill':
        node.setImageFill(value)
        break
      case 'imageFillScaleMode':
        node.setImageFillScaleMode(value)
        break
      case 'fills':
        node.setFill(value)
        break
      case 'fillType':
        node.setFillType(value)
        break
    }
  })
  const fillType = layerInvoker('fillType')
  const solidFill = layerInvoker('solidFill')
  const type = fillType.value

  useEffect(() => {
    if (!animatableValue(fillType.value)) {
      fillType.onChange(paintMode.Solid)
    }
    if (!animatableValue(solidFill.value)) {
      solidFill.onChange(getRandomColor())
    }
  }, [])

  return (
    <div className={cn(styles.root, className)}>
      <TabsSelector items={tabs} value={type} onChange={({ name }) => fillType.onChange(name)} />
      <AnimatedVisible visible={to(type, t => t === paintMode.Solid)}>
        <Panel>
          <ColorPicker
            color={solidFill.value}
            onChange={color => {
              if (color) {
                solidFill.onChange(color.rgb)
              }
            }}
          />
        </Panel>
        <SolidPaintStyles
          getInitialColor={() => solidFill.value?.get?.() ?? getRandomColor()}
          activeColorKey={solidFill.value}
          onSelect={solidFill.onChange}
          onCreate={popoutsStore.goPrev}
        />
      </AnimatedVisible>

      <AnimatedVisible visible={to(type, t => t === paintMode.Image)}>
        <ImagePicker urlInvoker={layerInvoker('imageFill')} scaleModeInvoker={layerInvoker('imageFillScaleMode')} />
      </AnimatedVisible>
    </div>
  )
}

export default StackPanelFill
