import { FC, useCallback, useContext, useRef } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { animated, Interpolation, SpringValue, to, useSpring } from '@react-spring/web'
import { Text } from '@/widgets/renderer/Text/Text'
import { nodes } from '@fragments/plugin-state'
import { LinkKey } from '@graph-state/core'

interface LayerProps {
  layerKey: LinkKey
}

export const Frame: FC<LayerProps> = ({ layerKey }) => {
  const { documentManager } = useContext(BuilderContext)
  const layerGraph = documentManager.resolve(layerKey)
  const cssStyles = layerGraph?.toCss?.() ?? {}

  if (!layerGraph) {
    return null
  }

  if (layerGraph?._type === nodes.Text) {
    return <Text layerKey={layerKey} />
  }

  return (
    <animated.div style={cssStyles} data-key={layerKey}>
      {layerGraph?.children?.filter(Boolean).map(child => (
        <Frame key={child._id} layerKey={child} />
      ))}
    </animated.div>
  )
}
