import { from, HttpLink } from '@apollo/client'
import { ApolloClient, InMemoryCache } from '@apollo/experimental-nextjs-app-support'
import { setContext } from '@apollo/client/link/context'
import { getSession } from 'next-auth/react'

// have a function to create a client for you
export function makeApolloClient() {
  const authMiddleware = setContext(async (operation, { headers }) => {
    const session = await getSession()

    return {
      headers: {
        ...headers,
        Authorization: `Bearer ${session?.accessToken}`,
        Refresh: `Bearer ${session?.refresh}`
      }
    }
  })

  const httpLink = new HttpLink({
    // this needs to be an absolute url, as relative urls cannot be used in SSR
    uri: process.env.NEXT_PUBLIC_BACKEND_GRAPHQL,
    // you can disable result caching here if you want to
    // (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
    fetchOptions: { cache: 'no-store' }
    // you can override the default `fetchOptions` on a per query basis
    // via the `context` property on the options passed as a second argument
    // to an Apollo Client data fetching hook, e.g.:
    // const { data } = useSuspenseQuery(MY_QUERY, { context: { fetchOptions: { cache: "force-cache" }}});
  })

  // use the `ApolloClient` from "@apollo/experimental-nextjs-app-support"
  return new ApolloClient({
    // use the `InMemoryCache` from "@apollo/experimental-nextjs-app-support"
    cache: new InMemoryCache({
      typePolicies: {
        Mutation: {
          fields: {
            deleteProjectItem: {
              merge(_, incoming, { cache, variables }) {
                cache.evict({ id: `ProjectItemGet:${variables?.projectItemId}` })
              }
            }
          }
        }
      }
    }),
    link: from([authMiddleware, httpLink])
  })
}
