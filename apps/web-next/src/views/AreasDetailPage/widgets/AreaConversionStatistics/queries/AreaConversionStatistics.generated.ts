import * as Types from '../../../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AreaConversionStatisticsQueryVariables = Types.Exact<{
  areaId: Types.Scalars['Int']['input'];
  fromTs: Types.Scalars['DateTime']['input'];
  toTs: Types.Scalars['DateTime']['input'];
  prevFromTs: Types.Scalars['DateTime']['input'];
  prevToTs: Types.Scalars['DateTime']['input'];
}>;


export type AreaConversionStatisticsQuery = { __typename?: 'Query', areaStatistic: Array<{ __typename?: 'AreaStatisticGet', areaId: number, areaCode: string, trend?: { __typename?: 'StatisticTrend', conversionTrend: { __typename?: 'StatisticTrendGet', difference: number, trend: Types.Trend } } | null, currentStatistic: { __typename?: 'StatisticGet', conversion: number } } | null> };


export const AreaConversionStatisticsDocument = gql`
    query AreaConversionStatistics($areaId: Int!, $fromTs: DateTime!, $toTs: DateTime!, $prevFromTs: DateTime!, $prevToTs: DateTime!) {
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
    }
  }
}
    `;

/**
 * __useAreaConversionStatisticsQuery__
 *
 * To run a query within a React component, call `useAreaConversionStatisticsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAreaConversionStatisticsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAreaConversionStatisticsQuery({
 *   variables: {
 *      areaId: // value for 'areaId'
 *      fromTs: // value for 'fromTs'
 *      toTs: // value for 'toTs'
 *      prevFromTs: // value for 'prevFromTs'
 *      prevToTs: // value for 'prevToTs'
 *   },
 * });
 */
export function useAreaConversionStatisticsQuery(baseOptions: Apollo.QueryHookOptions<AreaConversionStatisticsQuery, AreaConversionStatisticsQueryVariables> & ({ variables: AreaConversionStatisticsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AreaConversionStatisticsQuery, AreaConversionStatisticsQueryVariables>(AreaConversionStatisticsDocument, options);
      }
export function useAreaConversionStatisticsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AreaConversionStatisticsQuery, AreaConversionStatisticsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AreaConversionStatisticsQuery, AreaConversionStatisticsQueryVariables>(AreaConversionStatisticsDocument, options);
        }
export function useAreaConversionStatisticsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<AreaConversionStatisticsQuery, AreaConversionStatisticsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AreaConversionStatisticsQuery, AreaConversionStatisticsQueryVariables>(AreaConversionStatisticsDocument, options);
        }
export type AreaConversionStatisticsQueryHookResult = ReturnType<typeof useAreaConversionStatisticsQuery>;
export type AreaConversionStatisticsLazyQueryHookResult = ReturnType<typeof useAreaConversionStatisticsLazyQuery>;
export type AreaConversionStatisticsSuspenseQueryHookResult = ReturnType<typeof useAreaConversionStatisticsSuspenseQuery>;
export type AreaConversionStatisticsQueryResult = Apollo.QueryResult<AreaConversionStatisticsQuery, AreaConversionStatisticsQueryVariables>;