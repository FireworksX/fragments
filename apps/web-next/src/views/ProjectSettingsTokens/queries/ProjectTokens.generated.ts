import * as Types from '../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ProjectTokensQueryVariables = Types.Exact<{
  projectId?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type ProjectTokensQuery = { __typename?: 'Query', project: Array<{ __typename?: 'ProjectGet', id: number, privateKey?: string | null, publicKeys: Array<string> }> };


export const ProjectTokensDocument = gql`
    query ProjectTokens($projectId: Int) {
  project(projectId: $projectId) {
    id
    privateKey
    publicKeys
  }
}
    `;

/**
 * __useProjectTokensQuery__
 *
 * To run a query within a React component, call `useProjectTokensQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectTokensQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectTokensQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useProjectTokensQuery(baseOptions?: Apollo.QueryHookOptions<ProjectTokensQuery, ProjectTokensQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectTokensQuery, ProjectTokensQueryVariables>(ProjectTokensDocument, options);
      }
export function useProjectTokensLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectTokensQuery, ProjectTokensQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectTokensQuery, ProjectTokensQueryVariables>(ProjectTokensDocument, options);
        }
export function useProjectTokensSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProjectTokensQuery, ProjectTokensQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProjectTokensQuery, ProjectTokensQueryVariables>(ProjectTokensDocument, options);
        }
export type ProjectTokensQueryHookResult = ReturnType<typeof useProjectTokensQuery>;
export type ProjectTokensLazyQueryHookResult = ReturnType<typeof useProjectTokensLazyQuery>;
export type ProjectTokensSuspenseQueryHookResult = ReturnType<typeof useProjectTokensSuspenseQuery>;
export type ProjectTokensQueryResult = Apollo.QueryResult<ProjectTokensQuery, ProjectTokensQueryVariables>;