import { ComponentRef, FC, PropsWithChildren, use, ForwardedRef } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { TreeItemComponentProps } from 'dnd-kit-sortable-tree'
import { useBuilderCanvas } from '@/shared/hooks/fragmentBuilder/useBuilderCanvas'

interface ProjectTreeSortableItemProps extends TreeItemComponentProps, PropsWithChildren {
  className?: string
  ref?: ForwardedRef<ComponentRef<'div'>>
  selected?: boolean
}

export const ProjectTreeSortableItem: FC<ProjectTreeSortableItemProps> = ({
  className,
  selected,
  children,
  wrapperRef,
  indentationWidth,
  depth,
  handleProps,
  style,
  clone,
  ref
}) => {
  return (
    <div
      ref={wrapperRef}
      className={cn(styles.root, className, {
        [styles.clone]: clone,
        [styles.selected]: selected
      })}
      data-testid='BuilderLayerSortingCell'
      style={{
        ...style,
        paddingLeft: clone ? indentationWidth : indentationWidth * depth
      }}
      {...handleProps}
    >
      <div ref={ref}>{children}</div>
    </div>
  )
}
