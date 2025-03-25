import * as Types from '../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CurrentProjectsListQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type CurrentProjectsListQuery = { __typename?: 'Query', project: Array<{ __typename?: 'ProjectGet', id: number, name: string }> };


export const CurrentProjectsListDocument = gql`
    query CurrentProjectsList {
  project {
    id
    name
  }
}
    `;

/**
 * __useCurrentProjectsListQuery__
 *
 * To run a query within a React component, call `useCurrentProjectsListQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentProjectsListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentProjectsListQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentProjectsListQuery(baseOptions?: Apollo.QueryHookOptions<CurrentProjectsListQuery, CurrentProjectsListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CurrentProjectsListQuery, CurrentProjectsListQueryVariables>(CurrentProjectsListDocument, options);
      }
export function useCurrentProjectsListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentProjectsListQuery, CurrentProjectsListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CurrentProjectsListQuery, CurrentProjectsListQueryVariables>(CurrentProjectsListDocument, options);
        }
export function useCurrentProjectsListSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<CurrentProjectsListQuery, CurrentProjectsListQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CurrentProjectsListQuery, CurrentProjectsListQueryVariables>(CurrentProjectsListDocument, options);
        }
export type CurrentProjectsListQueryHookResult = ReturnType<typeof useCurrentProjectsListQuery>;
export type CurrentProjectsListLazyQueryHookResult = ReturnType<typeof useCurrentProjectsListLazyQuery>;
export type CurrentProjectsListSuspenseQueryHookResult = ReturnType<typeof useCurrentProjectsListSuspenseQuery>;
export type CurrentProjectsListQueryResult = Apollo.QueryResult<CurrentProjectsListQuery, CurrentProjectsListQueryVariables>;