import { FC } from 'react'
import cn from 'classnames'
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import styles from './styles.module.css'
import { useBuilderTextEditor } from '@/builder/BuilderTextEditor/hooks/useBuilderTextEditor'
import { animated, to } from '@react-spring/web'
import { AnimatedVisible } from '@/app/components/AnimatedVisible/AnimatedVisible'

interface BuilderTextEditorProps {
  className?: string
}

export const BuilderTextEditor: FC<BuilderTextEditorProps> = ({ className }) => {
  const { editorStyles } = useBuilderTextEditor()

  return (
    <animated.div className={cn(styles.root, className)} data-testid='BuilderTextEditor' style={editorStyles}>
      <AnimatedVisible visible={to(editorStyles.opacity, o => o === 1)}>
        <RichTextPlugin
          contentEditable={<ContentEditable className={styles.contentEditable} />}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <AutoFocusPlugin />
      </AnimatedVisible>
    </animated.div>
  )
}
