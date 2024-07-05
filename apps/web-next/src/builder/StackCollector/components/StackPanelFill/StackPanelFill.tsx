import { FC, useContext, useEffect } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import StackColors from '../StackColors/StackColors'
import TabsSelector, { TabsSelectorItem } from '@/app/components/TabsSelector'
import { builderPaintMode, getDefaultImageFill, getDefaultSolidFill } from '@fragments/fragments-plugin/performance'
import { GraphValue } from '@graph-state/react'
import { popoutsStore } from '@/app/store/popouts.store'
import { useBuilderSelection } from '@/builder/hooks/useBuilderSelection'
import { useDisplayColor } from '@/builder/hooks/useDisplayColor'
import { useLayerInvoker } from '@/builder/hooks/useLayerInvoker'
import Panel from '@/builder/components/Panel/Panel'
import ColorPicker from '@/builder/components/ColorPicker/ColorPicker'
import ImagePicker from '@/builder/components/ImagePicker/ImagePicker'
import { BuilderContext } from '@/builder/BuilderContext'

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
  const layerInvoker = useLayerInvoker(
    selection,
    ({ key, value, node }) => {
      switch (key) {
        case 'fills':
          node.setFill(value)
          break
        case 'fillType':
          // if (!currentFills || currentFills?.findIndex?.(f => f.type === value) === -1) {
          if (value === builderPaintMode.Solid) {
            node.setDefaultSolidFill()
          }
          if (value === builderPaintMode.Image) {
            node.setImageFill()
          }
          //   if (value === builderPaintMode.Image) {
          //     layerInvoker('fills').onChange(getDefaultImageFill())
          //   }
          // }

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

  console.log(currentFill)

  // console.log(fills, type, currentFill.value)

  const changeColor = (color: Color) => {
    selectionGraph.setSolidFill(color)
    // fills.onChange({
    //   type: builderPaintMode.Solid,
    //   color
    // })
  }

  useEffect(() => {
    if (documentManager.isEmpty(fillType.value)) {
      fillType.onChange(builderPaintMode.Solid)
    }
  }, [fillType, documentManager])

  console.log(currentFill)

  return (
    <div className={cn(styles.root, className)}>
      <TabsSelector items={tabs} value={type} onChange={({ name }) => fillType.onChange(name)} />
      {type === builderPaintMode.Solid && (
        <>
          <Panel>
            <ColorPicker
              color={getColor(currentFill.value?.color)}
              onChange={color => {
                if (color) {
                  changeColor(color.rgb)
                }
              }}
            />
          </Panel>
          <StackColors
            getInitialColor={() => currentFill.value.clone().toJSON().color}
            activeColorKey={currentFill.value?.color}
            onSelect={changeColor}
            onCreate={popoutsStore.goPrev}
          />
        </>
      )}
      {type === builderPaintMode.Image && (
        <GraphValue graphState={documentManager} field={currentFill.value}>
          {value => (
            <ImagePicker value={value} onChange={selectionGraph.setImageFill} onReset={() => value?.reset?.()} />
          )}
        </GraphValue>
      )}
    </div>
  )
}

export default StackPanelFill
