import { FC, useCallback, useContext, useRef } from 'react'
import { BuilderContext } from '@/builder/BuilderContext'
import { animated, Interpolation, SpringValue, to, useSpring } from '@react-spring/web'
import { Text } from '@/builder/renderer'
import { nodes } from '@fragments/plugin-state'
import { withStyle } from '@/builder/renderer/providers/withStyle'
import { withDraggable } from '@/builder/renderer/providers/withDraggable'

interface LayerProps {
  layerKey: string
  onClick?: (e, options) => void
  onMouseOver?: (e, options) => void
  onMouseLeave?: (e, options) => void
}

export const Frame: FC<LayerProps> = withStyle(
  withDraggable(props => {
    const { documentManager } = useContext(BuilderContext)
    const key = documentManager.keyOfEntity(props)

    if (props?._type === nodes.Text) {
      return <Text {...props} onClick={props.onClick} />
    }

    const listeners = Object.fromEntries(Object.entries(props).filter(([propKey]) => propKey.startsWith('on')))

    return (
      <>
        <animated.div style={props.style} {...listeners} data-key={key}>
          {props.children?.map(child => (
            <Frame key={child._id} {...child} />
          ))}
        </animated.div>
      </>
    )
  })
)
