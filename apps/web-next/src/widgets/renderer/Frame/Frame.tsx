import { FC, useCallback, useContext, useRef } from 'react'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { animated, Interpolation, SpringValue, to, useSpring } from '@react-spring/web'
import { Text } from '@/widgets/renderer/Text/Text'
import { nodes } from '@fragments/plugin-state'
import { withStyle } from '@/widgets/renderer/providers/withStyle'
import { withDraggable } from '@/widgets/renderer/providers/withDraggable'
import { LinkKey } from '@graph-state/core'

interface LayerProps {
  renderKey: LinkKey
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
          {props.children?.filter(Boolean).map(child => (
            <Frame key={child._id} {...child} />
          ))}
        </animated.div>
      </>
    )
  })
)
