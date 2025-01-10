import { Children, cloneElement, createElement, FC, PropsWithChildren, ReactNode } from 'react'
import { to } from '@fragments/springs-factory'
import styles from './styles.module.css'
import cn from 'classnames'
import { SpringValue, animated } from '@react-spring/web'
import { LinkKey } from '@graph-state/core'
import { useBuilderHighlightNode } from '../hooks/useBuilderHighlightNode'
import { BuilderCanvasTextEditor } from '../../BuilderCanvasTextEditor'
import { toPx } from '@/shared/utils/toPx'
import { AnimatedHtml } from '@/shared/ui/AnimatedHtml'
import { Frame } from '@/widgets/renderer/Frame'
import { omit } from '@fragments/utils'
import { RenderAtoms } from '@/widgets/renderer/Fragment'
import { AnimatedVisible } from '@/shared/ui/AnimatedVisible'

interface LayerHighlightDraggingProps {
  headerNode?: ReactNode
  resizeNode?: ReactNode
  layerKey: LinkKey
  node: ReactNode
}

export const BuilderHighlightNode: FC<LayerHighlightDraggingProps> = ({ layerKey, headerNode, node, resizeNode }) => {
  const {
    isRichTextSelected,
    isHovered,
    isSelected,
    borderStyle,
    borderWidth,
    isParentSelected,
    isTextNode,
    isInstance,
    isTopNode
  } = useBuilderHighlightNode(layerKey, [])

  const nodeArray = Children.toArray(node)

  if (nodeArray.length > 0) {
    return nodeArray.map(node => {
      return cloneElement(
        node,
        {
          ...node.props,
          key: node?.props?.layerKey,
          className: cn(node.props?.className, styles.root, {
            [styles.textLayer]: isTextNode,
            [styles.instance]: isInstance
          })
        },
        <>
          <AnimatedVisible visible={isSelected || isHovered || isParentSelected}>
            <animated.div
              data-testid='highlight'
              data-higlight={layerKey}
              className={styles.mask}
              style={{
                '--borderWidth': borderWidth,
                '--borderStyle': borderStyle
              }}
            />
          </AnimatedVisible>

          {(isSelected || isTopNode) && headerNode}
          {isSelected && resizeNode}
          {isRichTextSelected && <BuilderCanvasTextEditor />}

          {node.props?.children}
        </>
      )
    })
  }

  return null
}
