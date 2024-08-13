import { ElementRef, FC, forwardRef, PropsWithChildren, ReactNode, useEffect } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { TreeItemComponentProps } from 'dnd-kit-sortable-tree'

interface BuilderLayerSortingCellProps extends PropsWithChildren<TreeItemComponentProps> {
  className?: string
}

export const BuilderLayerSortingCell = forwardRef<ElementRef<'div'>, BuilderLayerSortingCellProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={props.wrapperRef}
        className={cn(styles.root, className, {
          [styles.clone]: props.clone
        })}
        data-testid='BuilderLayerSortingCell'
        style={{
          ...props.style,
          paddingLeft: props.clone ? props.indentationWidth : props.indentationWidth * props.depth
        }}
        {...props.handleProps}
      >
        <div ref={ref}>{children}</div>
      </div>
    )
  }
)
