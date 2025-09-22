import { createContext, FC, PropsWithChildren } from 'react'
import { StackStore, useStackStore } from './usePopoutStore'

export const StackStoreContext = createContext<StackStore | null>(null)

export const StackProvider: FC<PropsWithChildren> = ({ children }) => {
  const store = useStackStore()

  return <StackStoreContext.Provider value={store}>{children}</StackStoreContext.Provider>
}
