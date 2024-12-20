import { createContext, FC, PropsWithChildren, use } from 'react'
import { LinkKey } from '@graph-state/core'
import { BuilderContext } from '@/shared/providers/BuilderContext'
import { useGraph } from '@graph-state/react'

export const FragmentInstanceContext = createContext({
  instanceLink: null,
  props: {},
  readProperty: () => null
})

interface ProviderProps extends PropsWithChildren {
  instanceLink: LinkKey
}

export const InstanceProvider: FC<ProviderProps> = ({ instanceLink, children }) => {
  const { documentManager } = use(BuilderContext)
  const [instanceGraph] = useGraph(documentManager, instanceLink)

  return (
    <FragmentInstanceContext
      value={{
        instanceLink,
        props: instanceGraph.props ?? {},
        readProperty: instanceGraph.readProperty
      }}
    >
      {children}
    </FragmentInstanceContext>
  )
}
