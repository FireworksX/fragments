import * as Types from '../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CampaignQueryVariables = Types.Exact<{
  areaId?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  id?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type CampaignQuery = { __typename?: 'Query', campaign: Array<{ __typename?: 'CampaignGet', id: number, name: string, active: boolean, default: boolean, logo: { __typename?: 'MediaGet', url: string }, featureFlag: { __typename?: 'FeatureFlagGet', id: number, name: string, releaseCondition: { __typename?: 'ReleaseConditionGet', id: number, conditionSets: Array<{ __typename?: 'ConditionSetGet', conditions: Array<{ __typename?: 'ConditionGet', filterType: Types.FilterType }> }> }, variants: Array<{ __typename?: 'VariantGet', rolloutPercentage: number, rotationType: Types.VariantRotationType, fragment?: { __typename?: 'FragmentVariantGet', props?: any | null, fragment: { __typename?: 'FragmentGet', id: number } } | null }> } }> };


export const CampaignDocument = gql`
    query Campaign($areaId: Int, $id: Int) {
  campaign(areaId: $areaId, campaignId: $id) {
    id
    name
    active
    logo {
      url: publicPath
    }
    default
    featureFlag {
      id
      name
      releaseCondition {
        id
        conditionSets {
          conditions {
            filterType
          }
        }
      }
      variants {
        rolloutPercentage
        rotationType
        fragment {
          fragment {
            id
          }
          props
        }
      }
    }
  }
}
    `;

/**
 * __useCampaignQuery__
 *
 * To run a query within a React component, call `useCampaignQuery` and pass it any options that fit your needs.
 * When your component renders, `useCampaignQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCampaignQuery({
 *   variables: {
 *      areaId: // value for 'areaId'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCampaignQuery(baseOptions?: Apollo.QueryHookOptions<CampaignQuery, CampaignQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CampaignQuery, CampaignQueryVariables>(CampaignDocument, options);
      }
export function useCampaignLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CampaignQuery, CampaignQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CampaignQuery, CampaignQueryVariables>(CampaignDocument, options);
        }
export function useCampaignSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<CampaignQuery, CampaignQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CampaignQuery, CampaignQueryVariables>(CampaignDocument, options);
        }
export type CampaignQueryHookResult = ReturnType<typeof useCampaignQuery>;
export type CampaignLazyQueryHookResult = ReturnType<typeof useCampaignLazyQuery>;
export type CampaignSuspenseQueryHookResult = ReturnType<typeof useCampaignSuspenseQuery>;
export type CampaignQueryResult = Apollo.QueryResult<CampaignQuery, CampaignQueryVariables>;