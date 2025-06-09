import { from, gql, HttpLink } from '@apollo/client'
import { ApolloClient, InMemoryCache } from '@apollo/experimental-nextjs-app-support'
import { setContext } from '@apollo/client/link/context'
import { getSession } from 'next-auth/react'
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs'
import axios from 'axios'

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

  const httpLink = createUploadLink({
    uri: process.env.NEXT_PUBLIC_BACKEND_GRAPHQL,
    fetchOptions: { cache: 'no-store' }
  })

  // use the `ApolloClient` from "@apollo/experimental-nextjs-app-support"
  return new ApolloClient({
    // use the `InMemoryCache` from "@apollo/experimental-nextjs-app-support"
    cache: new InMemoryCache({
      typePolicies: {
        Mutation: {
          fields: {
            deleteProjectGoal: {
              merge(_, _incoming, { cache, variables }) {
                cache.evict({ id: `ProjectGoalGet:${variables?.id}` })
              }
            },
            deleteFragment: {
              merge(_, _incoming, { cache, variables }) {
                cache.evict({ id: `FragmentGet:${variables?.id}` })
              }
            },
            deleteDirectory: {
              merge(_, _incoming, { cache, variables }) {
                cache.evict({ id: `ProjectDirectoryGet:${variables?.id}` })
              }
            },
            deleteProjectPublicKey: {
              merge(_, _incoming, { cache, variables }) {
                cache.evict({ id: `ProjectKeyGet:${variables?.publicKeyId}` })
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
                        return [...existingFragments, incoming]
                      }
                    }
                  })
                }
              }
            },
            createDirectory: {
              merge(outcome, [incoming], { cache, variables }) {
                const nextDirectory = cache.readFragment({
                  id: incoming?.__ref,
                  fragment: gql`
                    fragment _ on ProjectDirectoryGet {
                      projectId
                    }
                  `
                })
                const { rootDirectoryId } =
                  cache.readFragment({
                    id: `ProjectGet:${nextDirectory?.projectId}`,
                    fragment: gql`
                      fragment _ on ProjectGet {
                        rootDirectoryId
                      }
                    `
                  }) ?? {}

                if (rootDirectoryId) {
                  cache.modify({
                    fields: {
                      directory(existingFragments = [], { readField, storeFieldName, ...r }) {
                        const isTargetDirectory = storeFieldName.includes(`${rootDirectoryId}`)
                        return isTargetDirectory ? [...existingFragments, incoming] : existingFragments
                      }
                    }
                  })
                }
              }
            },

            createArea: {
              merge(outcome, incoming, { cache, variables }) {
                cache.modify({
                  fields: {
                    areas(list = []) {
                      return [...list, incoming]
                    }
                  }
                })
              }
            },

            createProjectGoal: {
              merge(outcome, incoming, { cache, variables }) {
                cache.modify({
                  fields: {
                    projectGoals(list = []) {
                      return [...list, incoming]
                    }
                  }
                })
              }
            },

            createCampaign: {
              merge(outcome, incoming, { cache, variables }) {
                cache.modify({
                  fields: {
                    campaign(list = []) {
                      return [...list, incoming]
                    }
                  }
                })
              }
            },

            createProject: {
              merge(_, _incoming, { cache }) {
                cache.evict({ id: 'ROOT_QUERY', fieldName: 'project' })
              }
            }
          }
        }
      }
    }),
    link: from([authMiddleware, httpLink])
  })
}
