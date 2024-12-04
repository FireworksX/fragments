import { FC, PropsWithChildren, ReactNode } from 'react'
import styles from './styles.module.css'
import cn from 'classnames'
import { SpringValue, animated, to } from '@react-spring/web'
import { LinkKey } from '@graph-state/core'
import { useLayerHighlightNode } from '../hooks/useLayerHighlightNode'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin'
import { AnimatedVisible } from '@/shared/ui/AnimatedVisible'
import { BuilderCanvasTextEditor } from '@/widgets/fragmentBuilder/BuilderCanvasTextEditor'

interface LayerHighlightDraggingProps {
  resizeNode: ReactNode
  layerKey: LinkKey
  className?: string
  renderChildren?: (layerNode: unknown) => ReactNode
}

export const LayerHighlightNode: FC<LayerHighlightDraggingProps> = ({
  className,
  renderChildren,
  layerKey,
  resizeNode
}) => {
  const {
    textContent,
    layerStyles,
    isRichTextSelected,
    layerNode,
    children,
    isHovered,
    isSelected,
    isDragging,
    borderWidth,
    isParentSelected
  } = useLayerHighlightNode(layerKey)

  const resultChildren = renderChildren ? renderChildren(layerNode) : null

  return (
    <animated.div
      data-highlight-key={layerKey}
      data-highlight-type={layerNode?._type}
      className={cn(styles.root, className)}
      style={layerStyles}
    >
      {(isHovered || isSelected || isParentSelected) && (
        <animated.div
          data-testid='highlight'
          className={cn(styles.mask, { [styles.dashed]: isParentSelected && !isDragging })}
          style={{ borderWidth }}
        >
          {isSelected && resizeNode}
          {isRichTextSelected && (
            <>
              <BuilderCanvasTextEditor />
            </>
          )}
        </animated.div>
      )}

      {children.map((child, index) => (
        <LayerHighlightNode key={index} layerKey={child} resizeNode={resizeNode} />
      ))}

      {textContent && <div className={styles.text} dangerouslySetInnerHTML={{ __html: textContent }} />}

      {resultChildren}
    </animated.div>
  )
}
