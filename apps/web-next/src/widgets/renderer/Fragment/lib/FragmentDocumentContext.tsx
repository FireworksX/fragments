import { createContext, FC, PropsWithChildren, use } from 'react'
import { GraphState, LinkKey } from '@graph-state/core'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useGraph } from '@graph-state/react'
import { useBuilderDocument } from '@/shared/hooks/fragmentBuilder/useBuilderDocument'

export const FragmentDocumentContext = createContext({
  documentManager: null
})

interface ProviderProps extends PropsWithChildren {
  documentManager?: GraphState
}

export const FragmentDocumentProvider: FC<ProviderProps> = ({ documentManager, children }) => {
  const defaultDocumentManager = useBuilderDocument()
  const resultDocumentManager = documentManager ?? defaultDocumentManager

  return (
    <FragmentDocumentContext
      value={{
        documentManager: resultDocumentManager
      }}
    >
      {children}
    </FragmentDocumentContext>
  )
}
