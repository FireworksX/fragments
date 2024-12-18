import { CSSProperties, FC, memo, useCallback, useContext, useMemo, useRef } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { animated, Interpolation, SpringValue, to, useSpring } from '@react-spring/web'
import { Text } from '@/widgets/renderer/Text/Text'
import { nodes } from '@fragments/plugin-fragment-spring'
import { LinkKey } from '@graph-state/core'
import { FragmentInstance } from '@/widgets/renderer/FragmentInstance/FragmentInstance'
import { useExtendStyle } from '@/widgets/renderer/hooks/useExtendStyle'
import { useGraph } from '@graph-state/react'
import { useLayerStyles } from '@/shared/hooks/fragmentBuilder/useLayerStyles'

interface LayerProps {
  layerKey: LinkKey
  renderParents: LinkKey[]
  // style?: CSSProperties
}

const Frame: FC<LayerProps> = ({ layerKey, renderParents = [] }) => {
  const { documentManager } = useContext(BuilderContext)
  const [layerGraph] = useGraph(documentManager, layerKey)
  const cssStyles = useLayerStyles(layerKey, renderParents)
  // const extendedStyle = useExtendStyle(cssStyles, style)
  const attributes = layerGraph?.attributes

  if (!layerGraph) {
    return null
  }

  if (layerGraph?._type === nodes.FragmentInstance) {
    return <FragmentInstance layerKey={layerKey} renderParents={renderParents} />
  }

  if (layerGraph?._type === nodes.Text) {
    return <Text layerKey={layerKey} renderParents={renderParents} />
  }

  return (
    <animated.div {...attributes} style={cssStyles} data-key={layerKey}>
      {layerGraph?.children?.filter(Boolean).map(child => (
        <Frame key={child} layerKey={child} renderParents={[...renderParents, layerKey]} />
      ))}
    </animated.div>
  )
}

export default memo(Frame)
