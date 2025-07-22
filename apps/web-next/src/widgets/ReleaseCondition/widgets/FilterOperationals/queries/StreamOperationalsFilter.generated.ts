import * as Types from '../../../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type StreamOperationalsFilterQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type StreamOperationalsFilterQuery = { __typename?: 'Query', filter: { __typename?: 'AllFiltersGet', osTypes: Array<Types.OsType> } };


export const StreamOperationalsFilterDocument = gql`
    query StreamOperationalsFilter {
  filter {
    osTypes
  }
}
    `;

/**
 * __useStreamOperationalsFilterQuery__
 *
 * To run a query within a React component, call `useStreamOperationalsFilterQuery` and pass it any options that fit your needs.
 * When your component renders, `useStreamOperationalsFilterQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStreamOperationalsFilterQuery({
 *   variables: {
 *   },
 * });
 */
export function useStreamOperationalsFilterQuery(baseOptions?: Apollo.QueryHookOptions<StreamOperationalsFilterQuery, StreamOperationalsFilterQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StreamOperationalsFilterQuery, StreamOperationalsFilterQueryVariables>(StreamOperationalsFilterDocument, options);
      }
export function useStreamOperationalsFilterLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StreamOperationalsFilterQuery, StreamOperationalsFilterQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StreamOperationalsFilterQuery, StreamOperationalsFilterQueryVariables>(StreamOperationalsFilterDocument, options);
        }
export function useStreamOperationalsFilterSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<StreamOperationalsFilterQuery, StreamOperationalsFilterQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<StreamOperationalsFilterQuery, StreamOperationalsFilterQueryVariables>(StreamOperationalsFilterDocument, options);
        }
export type StreamOperationalsFilterQueryHookResult = ReturnType<typeof useStreamOperationalsFilterQuery>;
export type StreamOperationalsFilterLazyQueryHookResult = ReturnType<typeof useStreamOperationalsFilterLazyQuery>;
export type StreamOperationalsFilterSuspenseQueryHookResult = ReturnType<typeof useStreamOperationalsFilterSuspenseQuery>;
export type StreamOperationalsFilterQueryResult = Apollo.QueryResult<StreamOperationalsFilterQuery, StreamOperationalsFilterQueryVariables>;