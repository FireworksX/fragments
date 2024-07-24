import { FC, MutableRefObject } from 'react'
import cn from 'classnames'
import styles from './styles.module.css'
import * as Styled from './styles.module.css'
import { BuilderReachTextOptions, useBuilderReachText } from './hooks/useBuilderReachText'
import { animated } from '@react-spring/web'
import RichTextEditor from '@/app/widgets/RichTextEditor/RichTextEditor'

interface BuilderRichTextProps extends BuilderReachTextOptions {
  editorRef: MutableRefObject<RichTextEditorRef>
  className?: string
}

const BuilderRichText: FC<BuilderRichTextProps> = ({ className, editorRef, popoutRef, controlsRef }) => {
  const { reachTextStyles, editorWrapperRef, editorStyles, handleMountEditor } = useBuilderReachText({
    popoutRef,
    controlsRef
  })

  return (
    <animated.div className={cn(styles.root, className)} style={reachTextStyles}>
      <animated.div ref={editorWrapperRef} style={editorStyles}>
        <RichTextEditor onMount={handleMountEditor} />
      </animated.div>
    </animated.div>
  )
}

export default BuilderRichText
