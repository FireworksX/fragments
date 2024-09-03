import { useParseRules } from './hooks/useLayerRules/useParseRules'
import { FC, useCallback, useContext } from 'react'
import { BuilderContext } from '@/builder/BuilderContext'
import { animated, Interpolation, SpringValue, to } from '@react-spring/web'
import { useGraph } from '@graph-state/react'
import { builderNodes } from '@fragments/fragments-plugin/performance'
import { Text } from '@/builder/renderer/Text/Text'
import { withProps } from '@/builder/renderer/providers/withProps'
import { nodes } from '@fragments/plugin-state'

interface LayerProps {
  layerKey: string
  onClick?: (e, options) => void
  onMouseOver?: (e, options) => void
  onMouseLeave?: (e, options) => void
}

export const Frame: FC<LayerProps> = withProps(props => {
  const { documentManager } = useContext(BuilderContext)
  const { cssRules } = useParseRules(props)
  const key = documentManager.keyOfEntity(props)

  if (props?._type === nodes.Text) {
    return <Text {...props} onClick={props.onClick} />
  }

  const proxyOnClick = e => {
    props.onClick?.(e, {
      layerKey: key
    })
  }

  return (
    <>
      <animated.div data-key={key} style={cssRules} onClick={proxyOnClick}>
        {props.children.map(child => (
          <Frame key={child._id} {...child} onClick={props.onClick} />
        ))}
      </animated.div>
    </>
  )
})
