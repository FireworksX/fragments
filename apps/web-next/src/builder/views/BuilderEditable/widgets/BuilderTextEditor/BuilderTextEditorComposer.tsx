import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { FC, PropsWithChildren } from 'react'

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

const initialConfig = {
  namespace: 'BuilderTextEditor',
  theme,
  onError
}

export const BuilderTextEditorComposer: FC<BuilderTextEditorComposerProps> = ({ children }) => {
  return <LexicalComposer initialConfig={initialConfig}>{children}</LexicalComposer>
}
