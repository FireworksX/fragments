import * as Types from '../../../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AreasStatisticQueryVariables = Types.Exact<{
  areaIds: Array<Types.Scalars['Int']['input']> | Types.Scalars['Int']['input'];
  fromTs: Types.Scalars['DateTime']['input'];
  toTs: Types.Scalars['DateTime']['input'];
  prevFromTs: Types.Scalars['DateTime']['input'];
  prevToTs: Types.Scalars['DateTime']['input'];
}>;


export type AreasStatisticQuery = { __typename?: 'Query', areaStatistic: Array<{ __typename?: 'AreaStatisticGet', areaId: number, currentStatistic: { __typename?: 'StatisticGet', conversion: number }, trend?: { __typename?: 'StatisticTrend', conversionTrend: { __typename?: 'StatisticTrendGet', trend: Types.Trend, difference: number } } | null } | null> };


export const AreasStatisticDocument = gql`
    query AreasStatistic($areaIds: [Int!]!, $fromTs: DateTime!, $toTs: DateTime!, $prevFromTs: DateTime!, $prevToTs: DateTime!) {
  areaStatistic(
    statisticFilter: {dataIds: $areaIds, fromTs: $fromTs, toTs: $toTs, prevFromTs: $prevFromTs, prevToTs: $prevToTs}
  ) {
    areaId
    currentStatistic {
      conversion
    }
    trend {
      conversionTrend {
        trend
        difference
      }
    }
  }
}
    `;

/**
 * __useAreasStatisticQuery__
 *
 * To run a query within a React component, call `useAreasStatisticQuery` and pass it any options that fit your needs.
 * When your component renders, `useAreasStatisticQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAreasStatisticQuery({
 *   variables: {
 *      areaIds: // value for 'areaIds'
 *      fromTs: // value for 'fromTs'
 *      toTs: // value for 'toTs'
 *      prevFromTs: // value for 'prevFromTs'
 *      prevToTs: // value for 'prevToTs'
 *   },
 * });
 */
export function useAreasStatisticQuery(baseOptions: Apollo.QueryHookOptions<AreasStatisticQuery, AreasStatisticQueryVariables> & ({ variables: AreasStatisticQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AreasStatisticQuery, AreasStatisticQueryVariables>(AreasStatisticDocument, options);
      }
export function useAreasStatisticLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AreasStatisticQuery, AreasStatisticQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AreasStatisticQuery, AreasStatisticQueryVariables>(AreasStatisticDocument, options);
        }
export function useAreasStatisticSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<AreasStatisticQuery, AreasStatisticQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AreasStatisticQuery, AreasStatisticQueryVariables>(AreasStatisticDocument, options);
        }
export type AreasStatisticQueryHookResult = ReturnType<typeof useAreasStatisticQuery>;
export type AreasStatisticLazyQueryHookResult = ReturnType<typeof useAreasStatisticLazyQuery>;
export type AreasStatisticSuspenseQueryHookResult = ReturnType<typeof useAreasStatisticSuspenseQuery>;
export type AreasStatisticQueryResult = Apollo.QueryResult<AreasStatisticQuery, AreasStatisticQueryVariables>;