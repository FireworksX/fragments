import * as Types from '../../../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CampaignDetailQueryVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
}>;


export type CampaignDetailQuery = { __typename?: 'Query', campaign: Array<{ __typename?: 'CampaignGet', id: number, name: string, active: boolean, filters: Array<{ __typename?: 'FilterDeviceTypeGet', deviceTypes: Array<Types.DeviceType> } | { __typename?: 'FilterGeoLocationsGet', geoLocations: Array<{ __typename?: 'FilterGeoLocationGet', city?: string | null, country: string, region?: string | null }> } | { __typename?: 'FilterOSTypeGet', osTypes: Array<Types.OsType> } | { __typename?: 'FilterPageGet', pages: Array<string> } | { __typename?: 'FilterTimeFramesGet', timeFrames: Array<{ __typename?: 'FilterTimeFrameGet', fromTime: any, toTime: any }> }> }> };


export const CampaignDetailDocument = gql`
    query CampaignDetail($id: Int!) {
  campaign(campaignId: $id) {
    id
    name
    active
    filters {
      ... on FilterDeviceTypeGet {
        deviceTypes
      }
      ... on FilterOSTypeGet {
        osTypes
      }
      ... on FilterGeoLocationsGet {
        geoLocations {
          city
          country
          region
        }
      }
      ... on FilterPageGet {
        pages
      }
      ... on FilterTimeFramesGet {
        timeFrames {
          fromTime
          toTime
        }
      }
    }
  }
}
    `;

/**
 * __useCampaignDetailQuery__
 *
 * To run a query within a React component, call `useCampaignDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useCampaignDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCampaignDetailQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCampaignDetailQuery(baseOptions: Apollo.QueryHookOptions<CampaignDetailQuery, CampaignDetailQueryVariables> & ({ variables: CampaignDetailQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CampaignDetailQuery, CampaignDetailQueryVariables>(CampaignDetailDocument, options);
      }
export function useCampaignDetailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CampaignDetailQuery, CampaignDetailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CampaignDetailQuery, CampaignDetailQueryVariables>(CampaignDetailDocument, options);
        }
export function useCampaignDetailSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<CampaignDetailQuery, CampaignDetailQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CampaignDetailQuery, CampaignDetailQueryVariables>(CampaignDetailDocument, options);
        }
export type CampaignDetailQueryHookResult = ReturnType<typeof useCampaignDetailQuery>;
export type CampaignDetailLazyQueryHookResult = ReturnType<typeof useCampaignDetailLazyQuery>;
export type CampaignDetailSuspenseQueryHookResult = ReturnType<typeof useCampaignDetailSuspenseQuery>;
export type CampaignDetailQueryResult = Apollo.QueryResult<CampaignDetailQuery, CampaignDetailQueryVariables>;