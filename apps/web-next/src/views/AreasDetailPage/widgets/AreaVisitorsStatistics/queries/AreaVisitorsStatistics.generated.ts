import * as Types from '../../../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AreaVisitorsStatisticsQueryVariables = Types.Exact<{
  areaId: Types.Scalars['Int']['input'];
  fromTs: Types.Scalars['DateTime']['input'];
  toTs: Types.Scalars['DateTime']['input'];
  prevFromTs: Types.Scalars['DateTime']['input'];
  prevToTs: Types.Scalars['DateTime']['input'];
}>;


export type AreaVisitorsStatisticsQuery = { __typename?: 'Query', areaStatistic: Array<{ __typename?: 'AreaStatisticGet', areaId: number, areaCode: string, trend?: { __typename?: 'StatisticTrend', conversionTrend: { __typename?: 'StatisticTrendGet', difference: number, trend: Types.Trend } } | null, currentStatistic: { __typename?: 'StatisticGet', conversion: number, uniqueAchieved: number, views: number, sessions: number }, prevStatistic: { __typename?: 'StatisticGet', conversion: number, achieved: number, views: number } } | null> };


export const AreaVisitorsStatisticsDocument = gql`
    query AreaVisitorsStatistics($areaId: Int!, $fromTs: DateTime!, $toTs: DateTime!, $prevFromTs: DateTime!, $prevToTs: DateTime!) {
  areaStatistic(
    statisticFilter: {dataIds: [$areaId], fromTs: $fromTs, toTs: $toTs, prevFromTs: $prevFromTs, prevToTs: $prevToTs}
  ) {
    areaId
    areaCode
    trend {
      conversionTrend {
        difference
        trend
      }
    }
    currentStatistic {
      conversion
      uniqueAchieved
      views
      sessions
    }
    prevStatistic {
      conversion
      achieved
      views
    }
  }
}
    `;

/**
 * __useAreaVisitorsStatisticsQuery__
 *
 * To run a query within a React component, call `useAreaVisitorsStatisticsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAreaVisitorsStatisticsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAreaVisitorsStatisticsQuery({
 *   variables: {
 *      areaId: // value for 'areaId'
 *      fromTs: // value for 'fromTs'
 *      toTs: // value for 'toTs'
 *      prevFromTs: // value for 'prevFromTs'
 *      prevToTs: // value for 'prevToTs'
 *   },
 * });
 */
export function useAreaVisitorsStatisticsQuery(baseOptions: Apollo.QueryHookOptions<AreaVisitorsStatisticsQuery, AreaVisitorsStatisticsQueryVariables> & ({ variables: AreaVisitorsStatisticsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AreaVisitorsStatisticsQuery, AreaVisitorsStatisticsQueryVariables>(AreaVisitorsStatisticsDocument, options);
      }
export function useAreaVisitorsStatisticsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AreaVisitorsStatisticsQuery, AreaVisitorsStatisticsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AreaVisitorsStatisticsQuery, AreaVisitorsStatisticsQueryVariables>(AreaVisitorsStatisticsDocument, options);
        }
export function useAreaVisitorsStatisticsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<AreaVisitorsStatisticsQuery, AreaVisitorsStatisticsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AreaVisitorsStatisticsQuery, AreaVisitorsStatisticsQueryVariables>(AreaVisitorsStatisticsDocument, options);
        }
export type AreaVisitorsStatisticsQueryHookResult = ReturnType<typeof useAreaVisitorsStatisticsQuery>;
export type AreaVisitorsStatisticsLazyQueryHookResult = ReturnType<typeof useAreaVisitorsStatisticsLazyQuery>;
export type AreaVisitorsStatisticsSuspenseQueryHookResult = ReturnType<typeof useAreaVisitorsStatisticsSuspenseQuery>;
export type AreaVisitorsStatisticsQueryResult = Apollo.QueryResult<AreaVisitorsStatisticsQuery, AreaVisitorsStatisticsQueryVariables>;