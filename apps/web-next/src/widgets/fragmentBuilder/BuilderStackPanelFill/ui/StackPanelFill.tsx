import { FC, ReactNode, useContext, useEffect } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
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
import { definition } from '@fragmentsx/definition'
import { colorToObject, objectToColorString } from '@fragmentsx/utils'
import { useLayerValue } from '@/shared/hooks/fragmentBuilder/useLayerValue'

export interface StackPanelFillOptions {}

interface StackPanelFillProps {
  className?: string
  stackColors?: ReactNode
}

const tabs: TabsSelectorItem[] = [
  {
    name: definition.paintMode.Solid,
    label: 'Solid'
  },
  {
    name: definition.paintMode.Image,
    label: 'Image'
  }
]

const StackPanelFill: FC<StackPanelFillProps> = ({ className, stackColors }) => {
  const [fillType, setFillType] = useLayerValue('fillType')
  const [solidFill, setSolidFill, { resultValue: solidFillValue, isVariable, setWithAutoPatch }] =
    useLayerValue('solidFill')
  const [, setImageFill, { resultValue: imageFillValue }] = useLayerValue('imageFill')
  const [, setImageSize, { resultValue: imageSizeValue }] = useLayerValue('imageSize')

  useEffect(() => {
    if (fillType === definition.paintMode.None || !fillType) {
      setFillType(definition.paintMode.Solid)
    }
  }, [])

  return (
    <div className={cn(styles.root, className)}>
      <TabsSelector items={tabs} value={fillType} onChange={({ name }) => setFillType(name)} />
      {fillType === definition.paintMode.Solid && (
        <>
          <Panel>
            <ColorPicker
              color={solidFillValue}
              onChange={color => {
                if (color) {
                  setWithAutoPatch(objectToColorString(color.rgb))
                }
              }}
            />
          </Panel>
          <SolidPaintStyles
            initialColor={isVariable ? null : solidFill}
            activeColorKey={solidFillValue}
            onSelect={setSolidFill}
            // onCreate={popoutsStore.goPrev}
          />
        </>
      )}

      {fillType === definition.paintMode.Image && (
        <ImagePicker
          urlInvoker={{
            value: imageFillValue ?? '',
            onChange: setImageFill
          }}
          scaleModeInvoker={{
            value: imageSizeValue,
            onChange: setImageSize
          }}
        />
      )}
    </div>
  )
}

export default StackPanelFill
