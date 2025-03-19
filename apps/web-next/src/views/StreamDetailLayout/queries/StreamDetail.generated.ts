import * as Types from '../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type StreamDetailQueryVariables = Types.Exact<{
  streamSlug: Types.Scalars['Int']['input'];
}>;


export type StreamDetailQuery = { __typename?: 'Query', stream: Array<{ __typename?: 'StreamGet', id: number, name: string, active: boolean, weight: number }> };


export const StreamDetailDocument = gql`
    query StreamDetail($streamSlug: Int!) {
  stream(streamId: $streamSlug) {
    id
    name
    active
    weight
  }
}
    `;

/**
 * __useStreamDetailQuery__
 *
 * To run a query within a React component, call `useStreamDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useStreamDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStreamDetailQuery({
 *   variables: {
 *      streamSlug: // value for 'streamSlug'
 *   },
 * });
 */
export function useStreamDetailQuery(baseOptions: Apollo.QueryHookOptions<StreamDetailQuery, StreamDetailQueryVariables> & ({ variables: StreamDetailQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StreamDetailQuery, StreamDetailQueryVariables>(StreamDetailDocument, options);
      }
export function useStreamDetailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StreamDetailQuery, StreamDetailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StreamDetailQuery, StreamDetailQueryVariables>(StreamDetailDocument, options);
        }
export function useStreamDetailSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<StreamDetailQuery, StreamDetailQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<StreamDetailQuery, StreamDetailQueryVariables>(StreamDetailDocument, options);
        }
export type StreamDetailQueryHookResult = ReturnType<typeof useStreamDetailQuery>;
export type StreamDetailLazyQueryHookResult = ReturnType<typeof useStreamDetailLazyQuery>;
export type StreamDetailSuspenseQueryHookResult = ReturnType<typeof useStreamDetailSuspenseQuery>;
export type StreamDetailQueryResult = Apollo.QueryResult<StreamDetailQuery, StreamDetailQueryVariables>;