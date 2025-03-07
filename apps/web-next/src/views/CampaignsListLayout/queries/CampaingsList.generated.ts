import * as Types from '../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CampaignsListQueryVariables = Types.Exact<{
  projectId: Types.Scalars['Int']['input'];
}>;


export type CampaignsListQuery = { __typename?: 'Query', campaign: Array<{ __typename?: 'CampaignGet', id: number, name: string, active: boolean, description?: string | null }> };


export const CampaignsListDocument = gql`
    query CampaignsList($projectId: Int!) {
  campaign(projectId: $projectId) {
    id
    name
    active
    description
  }
}
    `;

/**
 * __useCampaignsListQuery__
 *
 * To run a query within a React component, call `useCampaignsListQuery` and pass it any options that fit your needs.
 * When your component renders, `useCampaignsListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCampaignsListQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useCampaignsListQuery(baseOptions: Apollo.QueryHookOptions<CampaignsListQuery, CampaignsListQueryVariables> & ({ variables: CampaignsListQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CampaignsListQuery, CampaignsListQueryVariables>(CampaignsListDocument, options);
      }
export function useCampaignsListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CampaignsListQuery, CampaignsListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CampaignsListQuery, CampaignsListQueryVariables>(CampaignsListDocument, options);
        }
export function useCampaignsListSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<CampaignsListQuery, CampaignsListQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CampaignsListQuery, CampaignsListQueryVariables>(CampaignsListDocument, options);
        }
export type CampaignsListQueryHookResult = ReturnType<typeof useCampaignsListQuery>;
export type CampaignsListLazyQueryHookResult = ReturnType<typeof useCampaignsListLazyQuery>;
export type CampaignsListSuspenseQueryHookResult = ReturnType<typeof useCampaignsListSuspenseQuery>;
export type CampaignsListQueryResult = Apollo.QueryResult<CampaignsListQuery, CampaignsListQueryVariables>;