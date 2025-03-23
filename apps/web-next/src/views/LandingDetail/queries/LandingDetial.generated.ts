import * as Types from '../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type LandingDetailQueryVariables = Types.Exact<{
  landingId: Types.Scalars['Int']['input'];
}>;


export type LandingDetailQuery = { __typename?: 'Query', landing: Array<{ __typename?: 'LandingGet', name: string, active: boolean, weight?: number | null, props?: any | null, fragment?: { __typename?: 'FragmentGet', id: number } | null }> };


export const LandingDetailDocument = gql`
    query LandingDetail($landingId: Int!) {
  landing(landingId: $landingId) {
    name
    active
    fragment {
      id
    }
    weight
    props
  }
}
    `;

/**
 * __useLandingDetailQuery__
 *
 * To run a query within a React component, call `useLandingDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useLandingDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLandingDetailQuery({
 *   variables: {
 *      landingId: // value for 'landingId'
 *   },
 * });
 */
export function useLandingDetailQuery(baseOptions: Apollo.QueryHookOptions<LandingDetailQuery, LandingDetailQueryVariables> & ({ variables: LandingDetailQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LandingDetailQuery, LandingDetailQueryVariables>(LandingDetailDocument, options);
      }
export function useLandingDetailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LandingDetailQuery, LandingDetailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LandingDetailQuery, LandingDetailQueryVariables>(LandingDetailDocument, options);
        }
export function useLandingDetailSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<LandingDetailQuery, LandingDetailQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<LandingDetailQuery, LandingDetailQueryVariables>(LandingDetailDocument, options);
        }
export type LandingDetailQueryHookResult = ReturnType<typeof useLandingDetailQuery>;
export type LandingDetailLazyQueryHookResult = ReturnType<typeof useLandingDetailLazyQuery>;
export type LandingDetailSuspenseQueryHookResult = ReturnType<typeof useLandingDetailSuspenseQuery>;
export type LandingDetailQueryResult = Apollo.QueryResult<LandingDetailQuery, LandingDetailQueryVariables>;