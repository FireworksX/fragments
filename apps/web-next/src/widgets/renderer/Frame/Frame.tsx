import { CSSProperties, FC, useCallback, useContext, useRef } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { animated, Interpolation, SpringValue, to, useSpring } from '@react-spring/web'
import { Text } from '@/widgets/renderer/Text/Text'
import { nodes } from '@fragments/plugin-state'
import { LinkKey } from '@graph-state/core'
import { FragmentInstance } from '@/widgets/renderer/FragmentInstance/FragmentInstance'
import { useExtendStyle } from '@/widgets/renderer/hooks/useExtendStyle'

interface LayerProps {
  layerKey: LinkKey
  style?: CSSProperties
}

export const Frame: FC<LayerProps> = ({ layerKey, style }) => {
  const { documentManager } = useContext(BuilderContext)
  const layerGraph = documentManager.resolve(layerKey)
  const cssStyles = layerGraph?.toCss?.() ?? {}
  const extendedStyle = useExtendStyle(cssStyles, style)

  if (!layerGraph) {
    return null
  }

  if (layerGraph?._type === nodes.FragmentInstance) {
    return <FragmentInstance layerKey={layerKey} />
  }

  if (layerGraph?._type === nodes.Text) {
    return <Text layerKey={layerKey} />
  }

  return (
    <animated.div style={extendedStyle} data-key={layerKey}>
      {layerGraph?.children?.filter(Boolean).map(child => (
        <Frame key={child._id} layerKey={child} />
      ))}
    </animated.div>
  )
}
