import * as Types from '../../../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AreasListQueryVariables = Types.Exact<{
  projectId: Types.Scalars['Int']['input'];
}>;


export type AreasListQuery = { __typename?: 'Query', area: Array<{ __typename?: 'AreaGet', id: number, description?: string | null, defaultCampaign: { __typename?: 'CampaignGet', id: number, name: string, status: Types.CampaignStatus, logo: { __typename?: 'MediaGet', url: string } } }> };


export const AreasListDocument = gql`
    query AreasList($projectId: Int!) {
  area(projectId: $projectId) {
    id
    description
    defaultCampaign {
      id
      name
      logo {
        url: publicPath
      }
      status
    }
  }
}
    `;

/**
 * __useAreasListQuery__
 *
 * To run a query within a React component, call `useAreasListQuery` and pass it any options that fit your needs.
 * When your component renders, `useAreasListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAreasListQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useAreasListQuery(baseOptions: Apollo.QueryHookOptions<AreasListQuery, AreasListQueryVariables> & ({ variables: AreasListQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AreasListQuery, AreasListQueryVariables>(AreasListDocument, options);
      }
export function useAreasListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AreasListQuery, AreasListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AreasListQuery, AreasListQueryVariables>(AreasListDocument, options);
        }
export function useAreasListSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<AreasListQuery, AreasListQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AreasListQuery, AreasListQueryVariables>(AreasListDocument, options);
        }
export type AreasListQueryHookResult = ReturnType<typeof useAreasListQuery>;
export type AreasListLazyQueryHookResult = ReturnType<typeof useAreasListLazyQuery>;
export type AreasListSuspenseQueryHookResult = ReturnType<typeof useAreasListSuspenseQuery>;
export type AreasListQueryResult = Apollo.QueryResult<AreasListQuery, AreasListQueryVariables>;
