'use client'

import { ApolloNextAppProvider } from '@apollo/experimental-nextjs-app-support'
import { makeApolloClient } from '@/shared/api/ApolloClient'

// you need to create a component to wrap your app in
export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return <ApolloNextAppProvider makeClient={makeApolloClient}>{children}</ApolloNextAppProvider>
}
