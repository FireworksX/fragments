import { HttpLink } from '@apollo/client'
import { registerApolloClient, ApolloClient, InMemoryCache } from '@apollo/experimental-nextjs-app-support'
import { makeApolloClient } from '@/shared/api/ApolloClient'

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
  return makeApolloClient()
})
