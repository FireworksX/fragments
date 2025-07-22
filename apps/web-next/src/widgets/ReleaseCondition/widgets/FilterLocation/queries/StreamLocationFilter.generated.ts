import * as Types from '../../../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type StreamLocationFilterQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type StreamLocationFilterQuery = { __typename?: 'Query', filter: { __typename?: 'AllFiltersGet', geoLocations: Array<{ __typename?: 'CountryGet', country: string }> } };


export const StreamLocationFilterDocument = gql`
    query StreamLocationFilter {
  filter {
    geoLocations {
      country
    }
  }
}
    `;

/**
 * __useStreamLocationFilterQuery__
 *
 * To run a query within a React component, call `useStreamLocationFilterQuery` and pass it any options that fit your needs.
 * When your component renders, `useStreamLocationFilterQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStreamLocationFilterQuery({
 *   variables: {
 *   },
 * });
 */
export function useStreamLocationFilterQuery(baseOptions?: Apollo.QueryHookOptions<StreamLocationFilterQuery, StreamLocationFilterQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StreamLocationFilterQuery, StreamLocationFilterQueryVariables>(StreamLocationFilterDocument, options);
      }
export function useStreamLocationFilterLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StreamLocationFilterQuery, StreamLocationFilterQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StreamLocationFilterQuery, StreamLocationFilterQueryVariables>(StreamLocationFilterDocument, options);
        }
export function useStreamLocationFilterSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<StreamLocationFilterQuery, StreamLocationFilterQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<StreamLocationFilterQuery, StreamLocationFilterQueryVariables>(StreamLocationFilterDocument, options);
        }
export type StreamLocationFilterQueryHookResult = ReturnType<typeof useStreamLocationFilterQuery>;
export type StreamLocationFilterLazyQueryHookResult = ReturnType<typeof useStreamLocationFilterLazyQuery>;
export type StreamLocationFilterSuspenseQueryHookResult = ReturnType<typeof useStreamLocationFilterSuspenseQuery>;
export type StreamLocationFilterQueryResult = Apollo.QueryResult<StreamLocationFilterQuery, StreamLocationFilterQueryVariables>;