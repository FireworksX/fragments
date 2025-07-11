import * as Types from '../../../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type StreamDevicesFilterQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type StreamDevicesFilterQuery = { __typename?: 'Query', filter: { __typename?: 'AllFiltersGet', deviceTypes: Array<Types.DeviceType> } };


export const StreamDevicesFilterDocument = gql`
    query StreamDevicesFilter {
  filter(countries: [], regions: []) {
    deviceTypes
  }
}
    `;

/**
 * __useStreamDevicesFilterQuery__
 *
 * To run a query within a React component, call `useStreamDevicesFilterQuery` and pass it any options that fit your needs.
 * When your component renders, `useStreamDevicesFilterQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStreamDevicesFilterQuery({
 *   variables: {
 *   },
 * });
 */
export function useStreamDevicesFilterQuery(baseOptions?: Apollo.QueryHookOptions<StreamDevicesFilterQuery, StreamDevicesFilterQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StreamDevicesFilterQuery, StreamDevicesFilterQueryVariables>(StreamDevicesFilterDocument, options);
      }
export function useStreamDevicesFilterLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StreamDevicesFilterQuery, StreamDevicesFilterQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StreamDevicesFilterQuery, StreamDevicesFilterQueryVariables>(StreamDevicesFilterDocument, options);
        }
export function useStreamDevicesFilterSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<StreamDevicesFilterQuery, StreamDevicesFilterQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<StreamDevicesFilterQuery, StreamDevicesFilterQueryVariables>(StreamDevicesFilterDocument, options);
        }
export type StreamDevicesFilterQueryHookResult = ReturnType<typeof useStreamDevicesFilterQuery>;
export type StreamDevicesFilterLazyQueryHookResult = ReturnType<typeof useStreamDevicesFilterLazyQuery>;
export type StreamDevicesFilterSuspenseQueryHookResult = ReturnType<typeof useStreamDevicesFilterSuspenseQuery>;
export type StreamDevicesFilterQueryResult = Apollo.QueryResult<StreamDevicesFilterQuery, StreamDevicesFilterQueryVariables>;