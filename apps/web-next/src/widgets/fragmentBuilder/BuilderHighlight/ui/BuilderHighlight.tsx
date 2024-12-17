import { FC, PropsWithChildren } from 'react'
import cn from 'classnames'
import { animated } from '@react-spring/web'
import styles from './styles.module.css'
import { useBuilderHighlight } from '../hooks/useBuilderHighlight'
import { useBreakpoints } from '@/shared/hooks/fragmentBuilder/useBreakpoints'
import { LayerHighlightNode } from '@/features/fragmentBuilder/LayerHighlightNode'
import { LayerSelectedResize } from '@/features/fragmentBuilder/LayerSelectedResize'
import { HeaderBreakpoint } from '@/features/fragmentBuilder/HeaderBreakpoint'
import { nodes } from '@fragments/plugin-fragment-spring'
import { HeaderLayer } from '@/features/fragmentBuilder/HeaderLayer'
import { useFragmentLayers } from '@/shared/hooks/fragmentBuilder/useFragmentLayers'

interface BuilderLayerHighlightProps extends PropsWithChildren {
  className?: string
}

const BuilderHighlight: FC<BuilderLayerHighlightProps> = ({ className, children }) => {
  const { layers } = useFragmentLayers()
  // const { opacity } = useBuilderHighlight()

  return (
    <animated.div className={cn(className, styles.root)}>
      {layers.map(breakpointKey => (
        <LayerHighlightNode
          key={breakpointKey}
          layerKey={breakpointKey}
          // resizeNode={<LayerSelectedResize />}
          // renderChildren={layerNode => {
          //   return <HeaderLayer className={styles.layerWrapper} layerKey={breakpointKey} />
          // }}
        />
      ))}
    </animated.div>
  )
}

export default BuilderHighlight
