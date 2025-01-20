import { ElementRef, FC, forwardRef, PropsWithChildren, ReactNode, use, useEffect } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import { TreeItemComponentProps } from 'dnd-kit-sortable-tree'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useBuilderCanvas } from '@/shared/hooks/fragmentBuilder/useBuilderCanvas'

interface BuilderLayerSortingCellProps extends PropsWithChildren<TreeItemComponentProps> {
  className?: string
}

export const BuilderLayerSortingCell = forwardRef<ElementRef<'div'>, BuilderLayerSortingCellProps>(
  ({ className, children, ...props }, ref) => {
    const { manager: canvasManager } = useBuilderCanvas()

    const mouseOver = () => canvasManager.setHoverLayer(props?.item?.id)
    const mouseLeave = () => canvasManager.setHoverLayer('')

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
        onMouseOver={mouseOver}
        onMouseLeave={mouseLeave}
      >
        <div ref={ref}>{children}</div>
      </div>
    )
  }
)
