import { FC, PropsWithChildren, useEffect, useState } from 'react'
import cn from 'classnames'
import { definition } from '@fragmentsx/definition'
import { animated, to, useSpringValue } from '@react-spring/web'
import styles from './styles.module.css'
import { LayerSelectedResize } from '@/widgets/fragmentBuilder/BuilderHighlight/components/LayerSelectedResize'
import { BuilderHighlightBreakpoint } from '@/widgets/fragmentBuilder/BuilderHighlight/components/BuilderHighlightBreakpoint'
import { useFragmentLayers } from '@/shared/hooks/fragmentBuilder/useFragmentLayers'
import { useLayerGeometry } from '@/widgets/fragmentBuilder/BuilderHighlight/hooks/useLayerGeometry'
import { useBuilderSelection } from '@/shared/hooks/fragmentBuilder/useBuilderSelection'
import { getParent } from '@fragmentsx/render-core'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { useBuilderCanvas } from '@/shared/hooks/fragmentBuilder/useBuilderCanvas'
import { useCurrentDraggable } from '@/shared/hooks/useCurrentDraggable'
import { DragOverEvent, useDndMonitor } from '@dnd-kit/core'
import { droppableAreas } from '@/shared/data'
import { DragEndEvent } from '@dnd-kit/core/dist/types/events'
import { pick } from '@fragmentsx/utils'
import { useLayerInfo } from '@/shared/hooks/fragmentBuilder/useLayerInfo'

interface BuilderLayerHighlightProps extends PropsWithChildren {
  className?: string
}

const BuilderHighlight: FC<BuilderLayerHighlightProps> = ({ className, children }) => {
  const opacity = useSpringValue(0)
  const { canvas } = useBuilderCanvas()
  const { documentManager } = useBuilderDocument()
  const { selection, selectionGraph } = useBuilderSelection()
  const isInstanceSelection = selectionGraph?._type === definition.nodes.Instance
  // const hoverLayerGeometry = useLayerGeometry(canvas.hoverLayer)
  const selectionGeometry = useLayerGeometry(selection)
  const parentSelectionGeometry = useLayerGeometry(documentManager.keyOfEntity(getParent(documentManager, selection)))
  const { layers: breakpoints } = useFragmentLayers()

  const [droppableLayerKey, setDroppableLayerKey] = useState(null)
  const droppableGeometry = useLayerGeometry(droppableLayerKey)

  useDndMonitor({
    onDragOver(event: DragOverEvent) {
      if (event?.over?.data?.current?.area === droppableAreas.builderCanvasNode) {
        setDroppableLayerKey(event?.over?.data?.current?.layerKey)
      } else {
        setDroppableLayerKey(null)
      }
    },
    onDragEnd() {
      setDroppableLayerKey(null)
    },
    onDragCancel() {
      setDroppableLayerKey(null)
    }
  })

  useEffect(() => {
    opacity.set(canvas?.isMoving || !selection ? 0 : 1)
  }, [canvas?.isMoving, canvas.isDragging, selection, opacity])

  return (
    <>
      <animated.div data-highlight-root className={cn(className, styles.root)}>
        <animated.div
          className={cn(styles.highlight, styles.mask, styles.selectedHighlight)}
          style={{
            ...droppableGeometry,
            opacity: droppableLayerKey ? 1 : 0,
            '--borderWidth': '2px'
          }}
        />
        {/*<animated.div*/}
        {/*  data-type='hover'*/}
        {/*  className={cn(styles.highlight, styles.mask, styles.selectedHighlight)}*/}
        {/*  style={{*/}
        {/*    ...hoverLayerGeometry,*/}
        {/*    opacity: to([hoverLayerGeometry.height, hoverLayerGeometry.width], (h, w) =>*/}
        {/*      h !== 0 && w !== 0 && !!canvas.hoverLayer ? 1 : 0*/}
        {/*    )*/}
        {/*  }}*/}
        {/*/>*/}
        <animated.div
          data-highlight='selection'
          className={cn(styles.highlight, styles.mask, styles.selectedHighlight)}
          style={{
            ...selectionGeometry,
            opacity,
            '--color': isInstanceSelection ? 'var(--component)' : 'var(--primary)'
          }}
        >
          <LayerSelectedResize />
          {/*{isTextEditing && <BuilderCanvasTextEditor />}*/}
        </animated.div>
        <animated.div
          data-highlight='parent'
          className={cn(styles.highlight, styles.mask, styles.parentHighlight)}
          style={{
            '--style': to(canvas.isDragging, isDragging => (isDragging ? 'solid' : 'dashed')),
            '--borderWidth': to(canvas.isDragging, isDragging => (isDragging ? '2px' : '1px')),
            opacity: to(
              [opacity, parentSelectionGeometry.width, parentSelectionGeometry.height],
              (opacity, width, height) => (width === 0 || height === 0 ? 0 : opacity)
            ),
            ...parentSelectionGeometry
          }}
        />

        {breakpoints.map(breakpoint => (
          <BuilderHighlightBreakpoint key={breakpoint} layerKey={breakpoint} />
          // <animated.div key={breakpoint.layerKey} className={cn(styles.breakpointItem)} style={breakpoint.styles}>
          //   <HeaderLayer layerKey={breakpoint.layerKey} />
          // </animated.div>
        ))}
        {/*{layers.map(breakpointKey => (*/}
        {/*  <Frame*/}
        {/*    key={breakpointKey}*/}
        {/*    layerKey={breakpointKey}*/}
        {/*    render={(layerKey, node) => (*/}
        {/*      <BuilderHighlightNode*/}
        {/*        node={node}*/}
        {/*        layerKey={layerKey}*/}
        {/*        resizeNode={<LayerSelectedResize />}*/}
        {/*        headerNode={<HeaderLayer layerKey={layerKey} />}*/}
        {/*      />*/}
        {/*    )}*/}
        {/*  />*/}
        {/*))}*/}
      </animated.div>
    </>
  )
}

export default BuilderHighlight
