import { createElement, FC, PropsWithChildren } from 'react'
import cn from 'classnames'
import { animated } from '@react-spring/web'
import styles from './styles.module.css'
import { useBuilderHighlight } from '../hooks/useBuilderHighlight'
import { BuilderHighlightNode } from '../components/BuilderHighlightNode'
import { LayerSelectedResize } from '../components/LayerSelectedResize'
import { HeaderLayer } from '../components/HeaderLayer'
import { useFragmentLayers } from '@/shared/hooks/fragmentBuilder/useFragmentLayers'
import { Frame } from '@/widgets/renderer/Frame'
import { useBuilderHighlightNew } from '@/widgets/fragmentBuilder/BuilderHighlight/hooks/useBuilderHighlightNew'

interface BuilderLayerHighlightProps extends PropsWithChildren {
  className?: string
}

const BuilderHighlight: FC<BuilderLayerHighlightProps> = ({ className, children }) => {
  const { canvas, selectedStyles, breakpoints, parentStyles, opacity } = useBuilderHighlightNew()

  return (
    <>
      <animated.div
        data-highlight-root
        className={cn(className, styles.root)}
        style={{ scale: canvas.scale, x: canvas.x, y: canvas.y }}
      >
        <animated.div className={cn(styles.highlight, styles.selectedHighlight)} style={selectedStyles} />
        <animated.div className={cn(styles.highlight, styles.parentHighlight)} style={parentStyles} />

        {breakpoints.map(breakpoint => (
          <animated.div key={breakpoint.layerKey} className={cn(styles.breakpointItem)} style={breakpoint.styles}>
            <HeaderLayer layerKey={breakpoint.layerKey} />
          </animated.div>
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
