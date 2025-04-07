import { FC, PropsWithChildren, useEffect } from 'react'
import cn from 'classnames'
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

interface BuilderLayerHighlightProps extends PropsWithChildren {
  className?: string
}

const BuilderHighlight: FC<BuilderLayerHighlightProps> = ({ className, children }) => {
  const opacity = useSpringValue(0)
  const { canvas } = useBuilderCanvas()
  const { documentManager } = useBuilderDocument()
  const { selection } = useBuilderSelection()
  const selectionGeometry = useLayerGeometry(selection)
  const parentSelectionGeometry = useLayerGeometry(documentManager.keyOfEntity(getParent(documentManager, selection)))
  const { layers: breakpoints } = useFragmentLayers()

  useEffect(() => {
    opacity.set(canvas?.isMoving || !selection ? 0 : 1)
  }, [canvas?.isMoving, canvas.isDragging, selection, opacity])

  return (
    <>
      <animated.div data-highlight-root className={cn(className, styles.root)}>
        <animated.div
          className={cn(styles.highlight, styles.mask, styles.selectedHighlight)}
          style={{
            ...selectionGeometry,
            opacity
          }}
        >
          <LayerSelectedResize />
          {/*{isTextEditing && <BuilderCanvasTextEditor />}*/}
        </animated.div>
        <animated.div
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
