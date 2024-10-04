import { createContext, FC, useContext } from 'react'
import { useSpring } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import { BuilderContext } from '@/builder/BuilderContext'
import { nodes } from '@fragments/plugin-state'
import isBrowser from '@/app/utils/isBrowser'
import { findRefNode } from '@/builder/utils/findRefNode'
import { useGraph } from '@graph-state/react'
import { animatableValue } from '@/builder/utils/animatableValue'

export const withDraggable = (Component: FC) => {
  const DraggableComponent: FC = props => {
    const { documentManager, canvasManager } = useContext(BuilderContext)
    const [style, api] = useSpring(() => ({ left: 0, top: 0 }))
    const layerKey = documentManager.keyOfEntity(props)

    // Используем useDrag для обработки события перетаскивания
    const bind = useDrag(
      ({ offset: [ox, oy], event, first, last }) => {
        // Предотвращаем всплытие события к родителям
        event.stopPropagation()

        if (first) {
          canvasManager.setDragging(true)
        }
        if (last) {
          canvasManager.setDragging(false)
        }

        const scale = animatableValue(canvasManager.resolve(canvasManager)?.scale)
        const [left, top] = [ox, oy].map(v => v / scale)

        // if (first) {
        //   x += scale
        //   y += scale
        // }

        api.set({ left, top })
      },
      {
        // Фильтруем события только на текущем элементе
        filterTaps: true
      }
    )

    const resultProps = {
      ...props,
      ...(props._type !== nodes.Breakpoint ? {} : {}),
      style: {
        ...props.style,
        userSelect: 'none',
        touchAction: 'none'
      }
    }

    return <Component {...resultProps} />
  }

  DraggableComponent.displayName = `Draggable(${Component.displayName})`

  return DraggableComponent
}
