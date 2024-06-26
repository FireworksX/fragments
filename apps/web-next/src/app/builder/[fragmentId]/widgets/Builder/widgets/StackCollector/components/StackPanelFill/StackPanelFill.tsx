import { FC, useContext, useEffect } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import StackColors from '../StackColors/StackColors'
import ColorPicker from '@/app/builder/widgets/Builder/components/ColorPicker/ColorPicker'
import TabsSelector from '@/app/components/TabsSelector'
import { useBuilderSelection } from '@/app/builder/widgets/Builder/hooks/useBuilderSelection'
import { useDisplayColor } from '@/app/builder/widgets/Builder/hooks/useDisplayColor'
import Panel from '@/app/builder/widgets/Builder/components/Panel/Panel'
import ImagePicker from '@/app/builder/widgets/Builder/components/ImagePicker/ImagePicker'
import { useLayerInvokerNew } from '@/app/builder/widgets/Builder/hooks/useLayerInvokerNew'
import { builderPaintMode, getDefaultImageFill, getDefaultSolidFill } from '@fragments/fragments-plugin'
import { BuilderContext } from '@/app/builder/widgets/Builder/BuilderContext'
import { GraphValue } from '@graph-state/react'
import { popoutsStore } from '@/app/store/popouts.store'

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
  const { graphState } = useContext(BuilderContext)
  const { selection } = useBuilderSelection()
  const { getColor } = useDisplayColor()
  const layerInvoker = useLayerInvokerNew(
    selection,
    ({ key, value, node }) => {
      switch (key) {
        case 'fills':
          node.setFill(value)
          break
        case 'fillType':
          const currentFills = graphState.resolveValue(node, 'fills')
          if (!currentFills || currentFills?.findIndex?.(f => f.type === value) === -1) {
            if (value === builderPaintMode.Solid) {
              layerInvoker('fills').onChange(getDefaultSolidFill())
            }
            if (value === builderPaintMode.Image) {
              layerInvoker('fills').onChange(getDefaultImageFill())
            }
          }

          node.setFillType(value)
          break
      }
    },
    ({ key, node }) => {
      switch (key) {
        case 'currentFill':
          return node.getCurrentFill()
      }
    }
  )
  const fills = layerInvoker('fills')
  const fillType = layerInvoker('fillType')
  const currentFill = layerInvoker('currentFill')
  const type = fillType.value

  const changeColor = (color: Color) => {
    fills.onChange({
      type: builderPaintMode.Solid,
      color
    })
  }

  useEffect(() => {
    if (graphState.isEmpty(fillType.value)) {
      fillType.onChange(builderPaintMode.Solid)
    }
  }, [fillType, graphState])

  return (
    <div className={cn(styles.root, className)}>
      <TabsSelector items={tabs} value={type} onChange={({ name }) => fillType.onChange(name)} />
      {type === builderPaintMode.Solid && (
        <>
          <Panel>
            <GraphValue graphState={graphState} field={currentFill.value}>
              {value => {
                return (
                  <ColorPicker
                    color={getColor(value?.color)}
                    onChange={color => {
                      if (color) {
                        changeColor(color.rgb)
                      }
                    }}
                  />
                )
              }}
            </GraphValue>
          </Panel>
          <StackColors
            initialColor={getColor(currentFill.value?.color)}
            activeColorKey={currentFill.value?.color}
            onSelect={changeColor}
            onCreate={popoutsStore.goPrev}
          />
        </>
      )}
      {type === builderPaintMode.Image && <ImagePicker value={currentFill.value} onChange={fills.onChange} />}
    </div>
  )
}

export default StackPanelFill
