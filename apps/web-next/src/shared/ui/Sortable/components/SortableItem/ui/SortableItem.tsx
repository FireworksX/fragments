import { FC, PropsWithChildren, ReactNode } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import DragHandlerIcon from '@/shared/icons/next/grip-vertical.svg'
import { animated, useSpring } from '@react-spring/web'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Touchable } from '@/shared/ui/Touchable'

export interface SortableItemProps {
  id: string | number
  index?: number
  className?: string
  children: ReactNode
  pauseAppearAnimation?: boolean
}

export const SortableItem: FC<SortableItemProps> = ({ className, pauseAppearAnimation, id, index = 0, children }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })

  // Анимация появления элемента
  const appearAnimation = useSpring({
    from: {
      opacity: 0,
      transform: 'translateY(20px)',
      scale: 0.9
    },
    to: {
      opacity: 1,
      transform: 'translateY(0px)',
      scale: 1
    },
    delay: index * 50,
    pause: pauseAppearAnimation,
    config: {
      tension: 300,
      friction: 20
    }
  })

  // Анимация при перетаскивании
  const dragAnimation = useSpring({
    zIndex: isDragging ? 1000 : 1,
    config: {
      tension: 400,
      friction: 30
    }
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  const handlers = {
    ...attributes,
    ...listeners
  }

  return (
    <animated.div
      className={styles.root}
      ref={setNodeRef}
      style={{
        ...appearAnimation,
        ...dragAnimation,
        ...style,
        opacity: isDragging ? 0.8 : appearAnimation.opacity
      }}
    >
      <Touchable className={styles.handler} {...handlers}>
        <DragHandlerIcon />
      </Touchable>
      {children}
    </animated.div>
  )
}
