import * as Types from '../../../../__generated__/types'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
const defaultOptions = {} as const
export type ProjectDirectoryQueryVariables = Types.Exact<{
  directoryId: Types.Scalars['Int']['input']
}>

export type ProjectDirectoryQuery = {
  __typename?: 'Query'
  directory: Array<{
    __typename?: 'ProjectDirectoryGet'
    id: number
    parentId?: number | null
    name: string
    hasSubdirectories: boolean
    hasFragments: boolean
    fragments: Array<{ __typename?: 'FragmentGet'; id: number; name: string }>
  }>
}

export const ProjectDirectoryDocument = gql`
  query ProjectDirectory($directoryId: Int!) {
    directory(directoryId: $directoryId) {
      id
      parentId
      name
      hasSubdirectories
      hasFragments
      fragments {
        id
        name
      }
    }
  }
`

/**
 * __useProjectDirectoryQuery__
 *
 * To run a query within a React component, call `useProjectDirectoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectDirectoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectDirectoryQuery({
 *   variables: {
 *      directoryId: // value for 'directoryId'
 *   },
 * });
 */
export function useProjectDirectoryQuery(
  baseOptions: Apollo.QueryHookOptions<ProjectDirectoryQuery, ProjectDirectoryQueryVariables> &
    ({ variables: ProjectDirectoryQueryVariables; skip?: boolean } | { skip: boolean })
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<ProjectDirectoryQuery, ProjectDirectoryQueryVariables>(ProjectDirectoryDocument, options)
}
export function useProjectDirectoryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ProjectDirectoryQuery, ProjectDirectoryQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<ProjectDirectoryQuery, ProjectDirectoryQueryVariables>(ProjectDirectoryDocument, options)
}
export function useProjectDirectorySuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<ProjectDirectoryQuery, ProjectDirectoryQueryVariables>
) {
  const options = baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<ProjectDirectoryQuery, ProjectDirectoryQueryVariables>(
    ProjectDirectoryDocument,
    options
  )
}
export type ProjectDirectoryQueryHookResult = ReturnType<typeof useProjectDirectoryQuery>
export type ProjectDirectoryLazyQueryHookResult = ReturnType<typeof useProjectDirectoryLazyQuery>
export type ProjectDirectorySuspenseQueryHookResult = ReturnType<typeof useProjectDirectorySuspenseQuery>
export type ProjectDirectoryQueryResult = Apollo.QueryResult<ProjectDirectoryQuery, ProjectDirectoryQueryVariables>
