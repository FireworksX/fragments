import { FC, ReactNode, useContext, useEffect } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { builderPaintMode } from '@fragments/fragments-plugin/performance'
import { popoutsStore } from '@/shared/store/popouts.store'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { animated, to } from '@react-spring/web'
import { isLinkKey } from '@graph-state/core'
import { isObject } from '@fragments/utils'
import { TabsSelector, TabsSelectorItem } from '@/shared/ui/TabsSelector'
import { animatableValue } from '@/shared/utils/animatableValue'
import { AnimatedVisible } from '@/shared/ui/AnimatedVisible'
import { Panel } from '@/shared/ui/Panel'
import { ColorPicker } from '@/shared/ui/ColorPicker'
import { StackColors } from '@/features/popouts/StackColors'
import { ImagePicker } from '@/features/fragmentBuilder/ImagePicker'
import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'
import { useDisplayColor } from '@/shared/hooks/fragmentBuilder/useDisplayColor'
import { useLayerInvoker } from '@/shared/hooks/fragmentBuilder/useLayerInvoker'
import { cloneColor } from '@/shared/utils/cloneColor'
import { getRandomColor } from '@/shared/utils/random'

export interface StackPanelFillOptions {}

interface StackPanelFillProps {
  className?: string
  stackColors?: ReactNode
}

const tabs: TabsSelectorItem[] = [
  {
    name: builderPaintMode.Solid,
    label: 'Solid'
  },
  {
    name: builderPaintMode.Image,
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
      fillType.onChange(builderPaintMode.Solid)
    }
    if (!animatableValue(solidFill.value)) {
      solidFill.onChange(getRandomColor())
    }
  }, [])

  return (
    <div className={cn(styles.root, className)}>
      <TabsSelector items={tabs} value={type} onChange={({ name }) => fillType.onChange(name)} />
      <AnimatedVisible visible={to(type, t => t === builderPaintMode.Solid)}>
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
        <StackColors
          getInitialColor={() => solidFill.value?.get?.() ?? getRandomColor()}
          activeColorKey={solidFill.value}
          onSelect={solidFill.onChange}
          onCreate={popoutsStore.goPrev}
        />
      </AnimatedVisible>

      <AnimatedVisible visible={to(type, t => t === builderPaintMode.Image)}>
        <ImagePicker urlInvoker={layerInvoker('imageFill')} scaleModeInvoker={layerInvoker('imageFillScaleMode')} />
      </AnimatedVisible>
    </div>
  )
}

export default StackPanelFill
