import { ElementRef, FC, forwardRef, PropsWithChildren } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { TreeItemComponentProps } from 'dnd-kit-sortable-tree'

interface BuilderLayerSortingCellProps extends PropsWithChildren<TreeItemComponentProps> {
  className?: string
}

export const BuilderLayerSortingCell = forwardRef<ElementRef<'div'>, BuilderLayerSortingCellProps>(
  (
    {
      className,
      contentClassName,
      wrapperRef,
      children,
      style,
      clone,
      indentationWidth,
      depth,
      handleProps,
      parent,
      ...rest
    },
    ref
  ) => {
    return (
      <div
        ref={wrapperRef}
        className={cn(styles.root, className)}
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
)
