import * as Types from '../../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AreaDetailQueryVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
}>;


export type AreaDetailQuery = { __typename?: 'Query', area: Array<{ __typename?: 'AreaGet', id: number, description?: string | null, code: string, defaultCampaign: { __typename?: 'CampaignGet', id: number } }> };


export const AreaDetailDocument = gql`
    query AreaDetail($id: Int!) {
  area(areaId: $id) {
    id
    description
    code: areaCode
    defaultCampaign {
      id
    }
  }
}
    `;

/**
 * __useAreaDetailQuery__
 *
 * To run a query within a React component, call `useAreaDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useAreaDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAreaDetailQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAreaDetailQuery(baseOptions: Apollo.QueryHookOptions<AreaDetailQuery, AreaDetailQueryVariables> & ({ variables: AreaDetailQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AreaDetailQuery, AreaDetailQueryVariables>(AreaDetailDocument, options);
      }
export function useAreaDetailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AreaDetailQuery, AreaDetailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AreaDetailQuery, AreaDetailQueryVariables>(AreaDetailDocument, options);
        }
export function useAreaDetailSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<AreaDetailQuery, AreaDetailQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AreaDetailQuery, AreaDetailQueryVariables>(AreaDetailDocument, options);
        }
export type AreaDetailQueryHookResult = ReturnType<typeof useAreaDetailQuery>;
export type AreaDetailLazyQueryHookResult = ReturnType<typeof useAreaDetailLazyQuery>;
export type AreaDetailSuspenseQueryHookResult = ReturnType<typeof useAreaDetailSuspenseQuery>;
export type AreaDetailQueryResult = Apollo.QueryResult<AreaDetailQuery, AreaDetailQueryVariables>;