import * as Types from '../../../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type VariantsRolloutQueryVariables = Types.Exact<{
  featureFlagId: Types.Scalars['Int']['input'];
}>;


export type VariantsRolloutQuery = { __typename?: 'Query', featureFlag: { __typename?: 'FeatureFlagGet', id: number, variants: Array<{ __typename?: 'VariantGet', id: number, rolloutPercentage: number }> } };


export const VariantsRolloutDocument = gql`
    query VariantsRollout($featureFlagId: Int!) {
  featureFlag(featureFlagId: $featureFlagId) {
    id
    variants {
      id
      rolloutPercentage
    }
  }
}
    `;

/**
 * __useVariantsRolloutQuery__
 *
 * To run a query within a React component, call `useVariantsRolloutQuery` and pass it any options that fit your needs.
 * When your component renders, `useVariantsRolloutQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVariantsRolloutQuery({
 *   variables: {
 *      featureFlagId: // value for 'featureFlagId'
 *   },
 * });
 */
export function useVariantsRolloutQuery(baseOptions: Apollo.QueryHookOptions<VariantsRolloutQuery, VariantsRolloutQueryVariables> & ({ variables: VariantsRolloutQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VariantsRolloutQuery, VariantsRolloutQueryVariables>(VariantsRolloutDocument, options);
      }
export function useVariantsRolloutLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VariantsRolloutQuery, VariantsRolloutQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VariantsRolloutQuery, VariantsRolloutQueryVariables>(VariantsRolloutDocument, options);
        }
export function useVariantsRolloutSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<VariantsRolloutQuery, VariantsRolloutQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<VariantsRolloutQuery, VariantsRolloutQueryVariables>(VariantsRolloutDocument, options);
        }
export type VariantsRolloutQueryHookResult = ReturnType<typeof useVariantsRolloutQuery>;
export type VariantsRolloutLazyQueryHookResult = ReturnType<typeof useVariantsRolloutLazyQuery>;
export type VariantsRolloutSuspenseQueryHookResult = ReturnType<typeof useVariantsRolloutSuspenseQuery>;
export type VariantsRolloutQueryResult = Apollo.QueryResult<VariantsRolloutQuery, VariantsRolloutQueryVariables>;