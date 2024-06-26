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
  const { highlights } = useHighlights()

  return (
    <div className={cn(className, styles.root)}>
      {highlights.map((highlight, index) => (
        <animated.div
          className={styles.highlight}
          key={index}
          style={{ ...highlight, position: 'absolute', inset: 0 }}
        />
      ))}
    </div>
  )
}

export default LayerHighlight
