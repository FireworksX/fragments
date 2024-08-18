'use client'
import { FC } from 'react'
import cn from 'classnames'
import { animated } from '@react-spring/web'
import styles from './styles.module.css'
import { useHighlights } from './hooks/useHighlights'

interface BuilderLayerHighlightProps {
  className?: string
}

const LayerHighlight: FC<BuilderLayerHighlightProps> = ({ className }) => {
  const { focusHighlight } = useHighlights()

  return (
    <div className={cn(className, styles.root)}>
      <animated.div className={styles.highlight} style={{ ...focusHighlight, position: 'absolute', inset: 0 }} />
    </div>
  )
}

export default LayerHighlight
