import { FC, useCallback, useContext } from 'react'
import styles from './styles.module.css'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useGraph } from '@graph-state/react'
import { animated } from '@react-spring/web'
import { useBuilderManager } from '@/shared/hooks/fragmentBuilder/useBuilderManager'

interface TextProps {
  layerKey: string
}

export const Text: FC<TextProps> = ({ layerKey }) => {
  const { documentManager, builderManager } = useContext(BuilderContext)
  const [layerGraph] = useGraph(documentManager, layerKey)
  const cssStyles = layerGraph?.toCss?.() ?? {}
  const { isTextEditing, focus } = useBuilderManager()

  return (
    <animated.div
      className={styles.root}
      data-key={layerKey}
      style={{
        ...cssStyles,
        opacity: isTextEditing && focus === layerKey ? 0 : cssStyles.opacity
      }}
      dangerouslySetInnerHTML={{ __html: layerGraph?.content }}
    />
  )
}
