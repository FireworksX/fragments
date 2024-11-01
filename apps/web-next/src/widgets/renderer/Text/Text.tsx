import { FC, useCallback, useContext } from 'react'
import styles from './styles.module.css'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useGraph } from '@graph-state/react'
import { animated } from '@react-spring/web'

interface TextProps {
  layerKey: string
}

export const Text: FC<TextProps> = ({ layerKey }) => {
  const { documentManager } = useContext(BuilderContext)
  const [layerGraph] = useGraph(documentManager, layerKey)
  const cssStyles = layerGraph?.toCss?.() ?? {}

  return (
    <animated.div
      className={styles.root}
      data-key={layerKey}
      style={cssStyles}
      dangerouslySetInnerHTML={{ __html: layerGraph.content }}
    />
  )
}
