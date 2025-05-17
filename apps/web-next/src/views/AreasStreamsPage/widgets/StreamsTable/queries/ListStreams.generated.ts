import * as Types from '../../../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ListSteamsQueryVariables = Types.Exact<{
  campaignSlug: Types.Scalars['Int']['input'];
}>;


export type ListSteamsQuery = { __typename?: 'Query', stream: Array<{ __typename?: 'StreamGet', id: number, weight: number, name: string, active: boolean }> };


export const ListSteamsDocument = gql`
    query ListSteams($campaignSlug: Int!) {
  stream(campaignId: $campaignSlug) {
    id
    weight
    name
    active
  }
}
    `;

/**
 * __useListSteamsQuery__
 *
 * To run a query within a React component, call `useListSteamsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListSteamsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListSteamsQuery({
 *   variables: {
 *      campaignSlug: // value for 'campaignSlug'
 *   },
 * });
 */
export function useListSteamsQuery(baseOptions: Apollo.QueryHookOptions<ListSteamsQuery, ListSteamsQueryVariables> & ({ variables: ListSteamsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListSteamsQuery, ListSteamsQueryVariables>(ListSteamsDocument, options);
      }
export function useListSteamsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListSteamsQuery, ListSteamsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListSteamsQuery, ListSteamsQueryVariables>(ListSteamsDocument, options);
        }
export function useListSteamsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListSteamsQuery, ListSteamsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListSteamsQuery, ListSteamsQueryVariables>(ListSteamsDocument, options);
        }
export type ListSteamsQueryHookResult = ReturnType<typeof useListSteamsQuery>;
export type ListSteamsLazyQueryHookResult = ReturnType<typeof useListSteamsLazyQuery>;
export type ListSteamsSuspenseQueryHookResult = ReturnType<typeof useListSteamsSuspenseQuery>;
export type ListSteamsQueryResult = Apollo.QueryResult<ListSteamsQuery, ListSteamsQueryVariables>;