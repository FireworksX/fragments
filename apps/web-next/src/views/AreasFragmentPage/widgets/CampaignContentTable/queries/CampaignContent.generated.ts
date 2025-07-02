import * as Types from '../../../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CampaignContentQueryVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
}>;


export type CampaignContentQuery = { __typename?: 'Query', campaign: Array<{ __typename?: 'CampaignGet', id: number, featureFlag?: { __typename?: 'FeatureFlagGet', id: number, variants: Array<{ __typename?: 'VariantGet', id: number, rolloutPercentage: number, name: string, fragment: { __typename?: 'FragmentGet', id: number, name: string } }> } | null }> };


export const CampaignContentDocument = gql`
    query CampaignContent($id: Int!) {
  campaign(campaignId: $id) {
    id
    featureFlag {
      id
      variants {
        id
        rolloutPercentage
        name
        fragment {
          id
          name
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