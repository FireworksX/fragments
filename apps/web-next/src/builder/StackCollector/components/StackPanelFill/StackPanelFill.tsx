import { FC, useContext, useEffect } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import StackColors from '../StackColors/StackColors'
import TabsSelector, { TabsSelectorItem } from '@/app/components/TabsSelector'
import { builderPaintMode } from '@fragments/fragments-plugin/performance'
import { popoutsStore } from '@/app/store/popouts.store'
import { useBuilderSelection } from '@/builder/hooks/useBuilderSelection'
import { useDisplayColor } from '@/builder/hooks/useDisplayColor'
import { useLayerInvoker } from '@/builder/hooks/useLayerInvoker'
import Panel from '@/builder/components/Panel/Panel'
import ColorPicker from '@/builder/components/ColorPicker/ColorPicker'
import ImagePicker from '@/builder/components/ImagePicker/ImagePicker'
import { BuilderContext } from '@/builder/BuilderContext'
import { animated, to } from '@react-spring/web'
import { AnimatedVisible } from '@/app/components/AnimatedVisible/AnimatedVisible'
import { cloneColor } from '@/builder/utils/cloneColor'
import { isLinkKey } from '@graph-state/core'
import { isObject } from '@fragments/utils'
import { animatableValue } from '@/builder/utils/animatableValue'

export interface StackPanelFillOptions {}

interface StackPanelFillProps {
  className?: string
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

const StackPanelFill: FC<StackPanelFillProps> = ({ className }) => {
  const { documentManager } = useContext(BuilderContext)
  const { selection, selectionGraph } = useBuilderSelection()
  const { getColor, getColorStatic } = useDisplayColor()
  const layerInvoker = useLayerInvoker(selection, ({ key, prevValue, documentManager, value, node }) => {
    switch (key) {
      case 'solidFill':
        node.setSolidFill(value)

        if (isLinkKey(prevValue) && isObject(value)) {
          popoutsStore.updateCurrentContext({ value: documentManager.resolveValue(node, 'borderColor') })
        }
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
  }, [])

  return (
    <div className={cn(styles.root, className)}>
      <TabsSelector items={tabs} value={type} onChange={({ name }) => fillType.onChange(name)} />
      <AnimatedVisible visible={to(type, t => t === builderPaintMode.Solid)}>
        <Panel>
          <ColorPicker
            color={getColor(solidFill.value)}
            onChange={color => {
              if (color) {
                solidFill.onChange(color.rgb)
              }
            }}
          />
        </Panel>
        <StackColors
          getInitialColor={() => cloneColor(solidFill.value)}
          // activeColorKey={currentFill.value?.color}
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
