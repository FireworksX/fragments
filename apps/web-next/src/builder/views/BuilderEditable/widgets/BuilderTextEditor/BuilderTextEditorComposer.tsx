import { InitialConfigType, LexicalComposer } from '@lexical/react/LexicalComposer'
import { FC, PropsWithChildren } from 'react'
import { ExtendedTextNode } from '@/builder/views/BuilderEditable/widgets/BuilderTextEditor/nodes/ExtendedTextNode'
import { ParagraphNode, TextNode } from 'lexical'

interface BuilderTextEditorComposerProps extends PropsWithChildren {}

const theme = {
  // Theme styling goes here
  //...
}

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error) {
  console.error(error)
}

const initialConfig: InitialConfigType = {
  namespace: 'BuilderTextEditor',
  theme,
  nodes: [ExtendedTextNode, { replace: TextNode, with: (node: TextNode) => new ExtendedTextNode(node.__text) }],
  onError
}

export const BuilderTextEditorComposer: FC<BuilderTextEditorComposerProps> = ({ children }) => {
  return <LexicalComposer initialConfig={initialConfig}>{children}</LexicalComposer>
}
