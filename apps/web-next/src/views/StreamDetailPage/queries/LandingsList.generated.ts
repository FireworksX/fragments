import * as Types from '../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type LandingsListQueryVariables = Types.Exact<{
  streamSlug: Types.Scalars['Int']['input'];
  landingId?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type LandingsListQuery = { __typename?: 'Query', landing: Array<{ __typename?: 'LandingGet', id: number, name: string, active: boolean, weight?: number | null }> };


export const LandingsListDocument = gql`
    query LandingsList($streamSlug: Int!, $landingId: Int) {
  landing(streamId: $streamSlug, landingId: $landingId) {
    id
    name
    active
    weight
  }
}
    `;

/**
 * __useLandingsListQuery__
 *
 * To run a query within a React component, call `useLandingsListQuery` and pass it any options that fit your needs.
 * When your component renders, `useLandingsListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLandingsListQuery({
 *   variables: {
 *      streamSlug: // value for 'streamSlug'
 *      landingId: // value for 'landingId'
 *   },
 * });
 */
export function useLandingsListQuery(baseOptions: Apollo.QueryHookOptions<LandingsListQuery, LandingsListQueryVariables> & ({ variables: LandingsListQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LandingsListQuery, LandingsListQueryVariables>(LandingsListDocument, options);
      }
export function useLandingsListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LandingsListQuery, LandingsListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LandingsListQuery, LandingsListQueryVariables>(LandingsListDocument, options);
        }
export function useLandingsListSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<LandingsListQuery, LandingsListQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<LandingsListQuery, LandingsListQueryVariables>(LandingsListDocument, options);
        }
export type LandingsListQueryHookResult = ReturnType<typeof useLandingsListQuery>;
export type LandingsListLazyQueryHookResult = ReturnType<typeof useLandingsListLazyQuery>;
export type LandingsListSuspenseQueryHookResult = ReturnType<typeof useLandingsListSuspenseQuery>;
export type LandingsListQueryResult = Apollo.QueryResult<LandingsListQuery, LandingsListQueryVariables>;