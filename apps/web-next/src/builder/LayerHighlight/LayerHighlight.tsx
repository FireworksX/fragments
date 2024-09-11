'use client'
import { FC } from 'react'
import cn from 'classnames'
import { animated } from '@react-spring/web'
import styles from './styles.module.css'
import { SPRING_INDEXES, useHighlights } from './hooks/useHighlights'
import { LayerHighlightSelect } from '@/builder/LayerHighlight/components/LayerHighlightSelect/LayerHightlightSelect'
import { LayerHighlightParent } from '@/builder/LayerHighlight/components/LayerHighlightParent/LayerHighlightParent'
import { LayerHighlightDragging } from '@/builder/LayerHighlight/components/LayerHighlightDragging/LayerHighlightDragging'

interface BuilderLayerHighlightProps {
  className?: string
}

const LayerHighlight: FC<BuilderLayerHighlightProps> = ({ className }) => {
  const {
    dragHandler,
    draggingParentStyles,
    draggingTargetStyles,
    hoverStyles,
    selectParentStyles,
    selectStyles,
    opacity
  } = useHighlights()

  return (
    <animated.div className={cn(className, styles.root)} style={{ opacity }}>
      <animated.div
        key='hover'
        className={styles.highlight}
        style={{ ...hoverStyles, position: 'absolute', inset: 0 }}
      />
      <animated.div
        key='focus'
        className={styles.highlight}
        style={{ ...selectStyles, position: 'absolute', inset: 0 }}
      />
      <LayerHighlightParent {...selectParentStyles} />
      <LayerHighlightSelect style={selectStyles} dragHandler={dragHandler} />
      <LayerHighlightDragging targetStyle={draggingTargetStyles} parentStyle={draggingParentStyles} />
    </animated.div>
  )
}

export default LayerHighlight
