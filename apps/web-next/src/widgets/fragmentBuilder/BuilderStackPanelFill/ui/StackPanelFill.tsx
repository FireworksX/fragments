import { FC, ReactNode, useContext, useEffect } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { popoutsStore } from '@/shared/store/popouts.store'
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
import { paintMode } from '@fragments/plugin-fragment-spring'
import { colorToObject, objectToColorString } from '@fragments/utils'
import { to } from '@fragments/springs-factory'
import { useLayerValue } from '@/shared/hooks/fragmentBuilder/useLayerValue'

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
  const [fillType, setFillType] = useLayerValue('fillType')
  const [solidFill, setSolidFill] = useLayerValue('solidFill')

  useEffect(() => {
    if (fillType === paintMode.None || !fillType) {
      setFillType(paintMode.Solid)
    }
  }, [])

  return (
    <div className={cn(styles.root, className)}>
      <TabsSelector items={tabs} value={fillType} onChange={({ name }) => setFillType(name)} />
      {fillType === paintMode.Solid && (
        <Panel>
          <ColorPicker
            color={solidFill}
            onChange={color => {
              if (color) {
                setSolidFill(objectToColorString(color.rgb))
              }
            }}
          />
        </Panel>
      )}
      {/*<SolidPaintStyles*/}
      {/*  getInitialColor={() => solidFill.value?.get?.() ?? getRandomColor()}*/}
      {/*  activeColorKey={solidFill.value}*/}
      {/*  onSelect={solidFill.onChange}*/}
      {/*  onCreate={popoutsStore.goPrev}*/}
      {/*/>*/}

      {/*<AnimatedVisible visible={to(type, t => t === paintMode.Image)}>*/}
      {/*  <ImagePicker urlInvoker={layerInvoker('imageFill')} scaleModeInvoker={layerInvoker('imageFillScaleMode')} />*/}
      {/*</AnimatedVisible>*/}
    </div>
  )
}

export default StackPanelFill
