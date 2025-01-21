import { createContext, FC, PropsWithChildren, useState } from 'react'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'
import { useSpringValue } from '@react-spring/web'

export const FragmentPreviewContext = createContext({
  documentManager: null,
  previewState: null
})

export const FragmentPreviewProvider: FC<PropsWithChildren> = ({ children }) => {
  const { documentManager } = useBuilderDocument()
  const [previewState, setPreviewState] = useState({})
  const width$ = useSpringValue(320)
  const height$ = useSpringValue(400)

  const state = {
    documentManager,
    previewState: {
      width$,
      height$
    }
  }

  return <FragmentPreviewContext value={state}>{children}</FragmentPreviewContext>
}
