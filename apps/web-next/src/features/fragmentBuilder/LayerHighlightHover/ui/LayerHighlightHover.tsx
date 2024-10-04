import { ElementRef, FC } from 'react'
import styles from './styles.module.css'
import { SpringValue, animated, to } from '@react-spring/web'
import { useHighlightHover } from '@/features/fragmentBuilder/LayerHighlightHover/hooks/useHighlightHover'

interface LayerHighlightHoverProps {
  className?: string
}

export const LayerHighlightHover: FC<LayerHighlightHoverProps> = ({ className }) => {
  const hoverStyles = useHighlightHover()

  return (
    <animated.div key='hover' className={styles.highlight} style={{ ...hoverStyles, position: 'absolute', inset: 0 }} />
  )
}
