import { from, gql, HttpLink } from '@apollo/client'
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
            deleteFragment: {
              merge(_, _incoming, { cache, variables }) {
                cache.evict({ id: `FragmentGet:${variables?.fragmentId}` })
              }
            },
            deleteDirectory: {
              merge(_, _incoming, { cache, variables }) {
                cache.evict({ id: `ProjectDirectoryGet:${variables?.directoryId}` })
              }
            },
            createFragment: {
              merge(outcome, incoming, { cache, variables }) {
                const parentId = variables?.parentId

                if (parentId) {
                  cache.modify({
                    id: `ProjectDirectoryGet:${parentId}`, // Родительский объект
                    fields: {
                      fragments(existingFragments = []) {
                        console.log(parentId, existingFragments, incoming)
                        return [...existingFragments, incoming]
                      }
                    }
                  })
                }
              }
            },
            createDirectory: {
              merge(outcome, incoming, { cache, variables }) {
                const parentId = variables?.parentId ?? -1
                // Нужно получить рутовую папку и отмутировать query
                // if (parentId) {
                //   cache.writeQuery({ query: '' })
                //   cache.modify({
                //     id: `ProjectDirectoryGet:${parentId}`, // Родительский объект
                //     fields: {
                //       directories(existingFragments = []) {
                //         return [...existingFragments, incoming]
                //       }
                //     }
                //   })
                // }
              }
            }
          }
        }
      }
    }),
    link: from([authMiddleware, httpLink])
  })
}
