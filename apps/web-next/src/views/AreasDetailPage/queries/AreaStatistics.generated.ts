import * as Types from '../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AreaStatisticsQueryVariables = Types.Exact<{
  areaId: Types.Scalars['Int']['input'];
  fromTs: Types.Scalars['DateTime']['input'];
  toTs: Types.Scalars['DateTime']['input'];
  prevFromTs: Types.Scalars['DateTime']['input'];
  prevToTs: Types.Scalars['DateTime']['input'];
}>;


export type AreaStatisticsQuery = { __typename?: 'Query', areaStatistic: Array<{ __typename?: 'AreaStatisticGet', areaId: number, areaCode: string, trend?: { __typename?: 'StatisticTrend', viewsTrend: { __typename?: 'StatisticTrendGet', difference: number, trend: Types.Trend }, conversionTrend: { __typename?: 'StatisticTrendGet', difference: number, trend: Types.Trend } } | null, currentStatistic: { __typename?: 'StatisticGet', views: number, conversion: number }, currentGroupByDate: { __typename?: 'DetalizationGraph', detalization: Types.Detalization, points: Array<{ __typename?: 'DetalizationGraphPoint', time: any, value: { __typename?: 'Value', views: number, conversion: number } }> }, prevGroupByDate: { __typename?: 'DetalizationGraph', detalization: Types.Detalization, points: Array<{ __typename?: 'DetalizationGraphPoint', time: any, value: { __typename?: 'Value', views: number, conversion: number } }> } } | null> };


export const AreaStatisticsDocument = gql`
    query AreaStatistics($areaId: Int!, $fromTs: DateTime!, $toTs: DateTime!, $prevFromTs: DateTime!, $prevToTs: DateTime!) {
  areaStatistic(
    statisticFilter: {dataIds: [$areaId], fromTs: $fromTs, toTs: $toTs, prevFromTs: $prevFromTs, prevToTs: $prevToTs}
  ) {
    areaId
    areaCode
    trend {
      viewsTrend {
        difference
        trend
      }
      conversionTrend {
        difference
        trend
      }
    }
    currentStatistic {
      views
      conversion
    }
    currentGroupByDate {
      detalization
      points {
        time
        value {
          views
          conversion
        }
      }
    }
    prevGroupByDate {
      detalization
      points {
        time
        value {
          views
          conversion
        }
      }
    }
  }
}
    `;

/**
 * __useAreaStatisticsQuery__
 *
 * To run a query within a React component, call `useAreaStatisticsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAreaStatisticsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAreaStatisticsQuery({
 *   variables: {
 *      areaId: // value for 'areaId'
 *      fromTs: // value for 'fromTs'
 *      toTs: // value for 'toTs'
 *      prevFromTs: // value for 'prevFromTs'
 *      prevToTs: // value for 'prevToTs'
 *   },
 * });
 */
export function useAreaStatisticsQuery(baseOptions: Apollo.QueryHookOptions<AreaStatisticsQuery, AreaStatisticsQueryVariables> & ({ variables: AreaStatisticsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AreaStatisticsQuery, AreaStatisticsQueryVariables>(AreaStatisticsDocument, options);
      }
export function useAreaStatisticsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AreaStatisticsQuery, AreaStatisticsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AreaStatisticsQuery, AreaStatisticsQueryVariables>(AreaStatisticsDocument, options);
        }
export function useAreaStatisticsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<AreaStatisticsQuery, AreaStatisticsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AreaStatisticsQuery, AreaStatisticsQueryVariables>(AreaStatisticsDocument, options);
        }
export type AreaStatisticsQueryHookResult = ReturnType<typeof useAreaStatisticsQuery>;
export type AreaStatisticsLazyQueryHookResult = ReturnType<typeof useAreaStatisticsLazyQuery>;
export type AreaStatisticsSuspenseQueryHookResult = ReturnType<typeof useAreaStatisticsSuspenseQuery>;
export type AreaStatisticsQueryResult = Apollo.QueryResult<AreaStatisticsQuery, AreaStatisticsQueryVariables>;