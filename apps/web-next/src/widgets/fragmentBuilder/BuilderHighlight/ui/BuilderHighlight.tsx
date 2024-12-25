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

interface BuilderLayerHighlightProps extends PropsWithChildren {
  className?: string
}

const BuilderHighlight: FC<BuilderLayerHighlightProps> = ({ className, children }) => {
  const { layers } = useFragmentLayers()

  return (
    <animated.div className={cn(className, styles.root)}>
      {layers.map(breakpointKey => (
        <Frame
          key={breakpointKey}
          layerKey={breakpointKey}
          render={(layerKey, node) => (
            <BuilderHighlightNode
              node={node}
              layerKey={layerKey}
              resizeNode={<LayerSelectedResize />}
              headerNode={<HeaderLayer layerKey={layerKey} />}
            />
          )}
        />
      ))}
    </animated.div>
  )
}

export default BuilderHighlight
