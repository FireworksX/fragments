import * as Types from '../../../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CampaignContentQueryVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
  fromTs: Types.Scalars['DateTime']['input'];
  toTs: Types.Scalars['DateTime']['input'];
  prevFromTs: Types.Scalars['DateTime']['input'];
  prevToTs: Types.Scalars['DateTime']['input'];
}>;


export type CampaignContentQuery = { __typename?: 'Query', campaign: Array<{ __typename?: 'CampaignGet', id: number, featureFlag: { __typename?: 'FeatureFlagGet', id: number, rotationType: Types.RotationType, variants: Array<{ __typename?: 'VariantGet', id: number, name: string, status: Types.VariantStatus, rolloutPercentage: number, fragment?: { __typename?: 'FragmentVariantGet', props?: any | null, fragment: { __typename?: 'FragmentGet', id: number, name: string } } | null }> } }>, campaignStatistic: Array<{ __typename?: 'CampaignStatisticGet', variants: Array<{ __typename?: 'VariantStatisticGet', variantId: number, trend: Types.Trend, currentStatistic: { __typename?: 'StatisticGet', conversion: number }, prevStatistic: { __typename?: 'StatisticGet', conversion: number }, goals: Array<{ __typename?: 'GoalStatisticGet', goalId: number, goalName: string, trend: Types.Trend, currentStatistic: { __typename?: 'StatisticGet', conversion: number }, prevStatistic: { __typename?: 'StatisticGet', conversion: number } }> }> }> };


export const CampaignContentDocument = gql`
    query CampaignContent($id: Int!, $fromTs: DateTime!, $toTs: DateTime!, $prevFromTs: DateTime!, $prevToTs: DateTime!) {
  campaign(campaignFilter: {campaignId: $id}) {
    id
    featureFlag {
      id
      rotationType
      variants {
        id
        name
        status
        rolloutPercentage
        fragment {
          fragment {
            id
            name
          }
          props
        }
      }
    }
  }
  campaignStatistic(
    statisticFilter: {dataIds: [$id], fromTs: $fromTs, toTs: $toTs, prevFromTs: $prevFromTs, prevToTs: $prevToTs}
  ) {
    variants {
      variantId
      currentStatistic {
        conversion
      }
      prevStatistic {
        conversion
      }
      trend
      goals {
        goalId
        goalName
        trend
        currentStatistic {
          conversion
        }
        prevStatistic {
          conversion
        }
      }
    }
  }
}
    `;

/**
 * __useCampaignContentQuery__
 *
 * To run a query within a React component, call `useCampaignContentQuery` and pass it any options that fit your needs.
 * When your component renders, `useCampaignContentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCampaignContentQuery({
 *   variables: {
 *      id: // value for 'id'
 *      fromTs: // value for 'fromTs'
 *      toTs: // value for 'toTs'
 *      prevFromTs: // value for 'prevFromTs'
 *      prevToTs: // value for 'prevToTs'
 *   },
 * });
 */
export function useCampaignContentQuery(baseOptions: Apollo.QueryHookOptions<CampaignContentQuery, CampaignContentQueryVariables> & ({ variables: CampaignContentQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CampaignContentQuery, CampaignContentQueryVariables>(CampaignContentDocument, options);
      }
export function useCampaignContentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CampaignContentQuery, CampaignContentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CampaignContentQuery, CampaignContentQueryVariables>(CampaignContentDocument, options);
        }
export function useCampaignContentSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<CampaignContentQuery, CampaignContentQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CampaignContentQuery, CampaignContentQueryVariables>(CampaignContentDocument, options);
        }
export type CampaignContentQueryHookResult = ReturnType<typeof useCampaignContentQuery>;
export type CampaignContentLazyQueryHookResult = ReturnType<typeof useCampaignContentLazyQuery>;
export type CampaignContentSuspenseQueryHookResult = ReturnType<typeof useCampaignContentSuspenseQuery>;
export type CampaignContentQueryResult = Apollo.QueryResult<CampaignContentQuery, CampaignContentQueryVariables>;