import { FC, useState, Children, ReactElement } from 'react'
import { closestCenter, DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { SortableItem } from '@/shared/ui/Sortable/components/SortableItem'
import { SortableItemProps } from '@/shared/ui/Sortable/components/SortableItem/ui/SortableItem'
import { animated, useSpring } from '@react-spring/web'
import { restrictToParentElement, restrictToVerticalAxis } from '@dnd-kit/modifiers'

type InputChild = ReactElement<{ stableKey: string }>

interface SortableProps {
  className?: string
  children: InputChild[]
  onSort?: (children: InputChild[]) => void
}

export const Sortable: FC<SortableProps> = ({ className, children = [], onSort }) => {
  // Модификаторы для ограничений
  const modifiers = [
    restrictToVerticalAxis, // Только вертикальное перемещение
    restrictToParentElement // Только в пределах родительского элемента
  ]

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5 // 5px - минимальное расстояние для начала перетаскивания
      }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )

  function handleDragEnd(event) {
    const { active, over } = event

    if (active.id !== over?.id) {
      const oldIndex = children.findIndex(item => item.key === active.id)
      const newIndex = children.findIndex(item => item.key === over.id)

      onSort?.(arrayMove(children, oldIndex, newIndex))
    }
  }

  return (
    <DndContext sensors={sensors} modifiers={modifiers} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={children.map(child => child.key)}>
        <animated.div className={className}>
          {children.map((child, index) => (
            <SortableItem key={child.key} id={child.key} index={index}>
              {child}
            </SortableItem>
          ))}
        </animated.div>
      </SortableContext>
    </DndContext>
  )
}
