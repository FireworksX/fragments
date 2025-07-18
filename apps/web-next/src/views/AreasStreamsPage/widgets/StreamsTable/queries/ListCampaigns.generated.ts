import * as Types from '../../../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ListCampaignsQueryVariables = Types.Exact<{
  areaId: Types.Scalars['Int']['input'];
}>;


export type ListCampaignsQuery = { __typename?: 'Query', campaign: Array<{ __typename?: 'CampaignGet', id: number, name: string, status: Types.CampaignStatus, logo: { __typename?: 'MediaGet', publicPath: string }, featureFlag: { __typename?: 'FeatureFlagGet', releaseCondition: { __typename?: 'ReleaseConditionGet', id: number, conditionSets: Array<{ __typename?: 'ConditionSetGet', id: number, name: string, conditions: Array<{ __typename?: 'ConditionGet', id: number }> }> } } }> };


export const ListCampaignsDocument = gql`
    query ListCampaigns($areaId: Int!) {
  campaign(areaId: $areaId) {
    id
    name
    status
    logo {
      publicPath
    }
    featureFlag {
      releaseCondition {
        id
        conditionSets {
          id
          name
          conditions {
            id
          }
        }
      }
    }
  }
}
    `;

/**
 * __useListCampaignsQuery__
 *
 * To run a query within a React component, call `useListCampaignsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListCampaignsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListCampaignsQuery({
 *   variables: {
 *      areaId: // value for 'areaId'
 *   },
 * });
 */
export function useListCampaignsQuery(baseOptions: Apollo.QueryHookOptions<ListCampaignsQuery, ListCampaignsQueryVariables> & ({ variables: ListCampaignsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListCampaignsQuery, ListCampaignsQueryVariables>(ListCampaignsDocument, options);
      }
export function useListCampaignsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListCampaignsQuery, ListCampaignsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListCampaignsQuery, ListCampaignsQueryVariables>(ListCampaignsDocument, options);
        }
export function useListCampaignsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListCampaignsQuery, ListCampaignsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListCampaignsQuery, ListCampaignsQueryVariables>(ListCampaignsDocument, options);
        }
export type ListCampaignsQueryHookResult = ReturnType<typeof useListCampaignsQuery>;
export type ListCampaignsLazyQueryHookResult = ReturnType<typeof useListCampaignsLazyQuery>;
export type ListCampaignsSuspenseQueryHookResult = ReturnType<typeof useListCampaignsSuspenseQuery>;
export type ListCampaignsQueryResult = Apollo.QueryResult<ListCampaignsQuery, ListCampaignsQueryVariables>;