import React, { FC, useContext } from 'react'
import { EditorContent } from '@tiptap/react'
import { CanvasTextEditorContext } from '@/widgets/fragmentBuilder/BuilderCanvasTextEditor'
import './styles.css'

interface BuilderFloatBarProps {
  className?: string
}

export const BuilderCanvasTextEditor: FC<BuilderFloatBarProps> = ({ className }) => {
  const editor = useContext(CanvasTextEditorContext)

  return (
    <div className='canvas-rich-editor'>
      <EditorContent editor={editor} />
    </div>
  )
}
