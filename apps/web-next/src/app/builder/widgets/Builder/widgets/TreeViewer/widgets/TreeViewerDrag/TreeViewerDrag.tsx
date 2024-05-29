import { FC, PropsWithChildren } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { AnimateLayoutChanges, useSortable } from '@dnd-kit/sortable'
import { useSpring, animated } from '@react-spring/web'
import TreeViewerIndicator from '../../components/TreeViewerIndicator/TreeViewerIndicator'

interface TreeViewerDragProps extends PropsWithChildren {
  indicator?: boolean
  depth?: number
  clone?: boolean
  layerKey: string
  className?: string
}

const initialStyles = {
  x: 0,
  y: 0,
  scale: 1,
  zIndex: 0,
  paddingLeft: 0,
  borderColor: ''
}

const animateLayoutChanges: AnimateLayoutChanges = ({ isSorting, wasDragging }) =>
  isSorting || wasDragging ? false : true

const TreeViewerDrag: FC<TreeViewerDragProps> = ({
  className,
  layerKey,
  depth = 1,
  indicator,
  children,
  ...restProps
}) => {
  const { transform, isDragging, isOver, attributes, listeners, setNodeRef } = useSortable({
    id: layerKey,
    animateLayoutChanges
  })

  const style = useSpring(
    transform
      ? {
          x: transform.x,
          y: transform.y,
          scale: isDragging ? 1.05 : 1,
          zIndex: isDragging ? 1 : 0,
          borderColor: '',
          paddingLeft: isDragging ? depth * 20 + 33 : depth * 20 + 10,
          config: { mass: 1, friction: 20, tension: 170 }
        }
      : {
          ...initialStyles,
          paddingLeft: depth * 20 + 10
        }
  )

  return (
    <animated.div
      className={cn(styles.root, className)}
      ref={setNodeRef}
      isDragging={isDragging}
      style={style}
      {...restProps}
      {...attributes}
      {...listeners}
    >
      {indicator ? isOver ? undefined : <TreeViewerIndicator /> : children}
    </animated.div>
  )
}

export default TreeViewerDrag
