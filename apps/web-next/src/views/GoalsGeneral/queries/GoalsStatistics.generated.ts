import * as Types from '../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GoalsStatisticsQueryVariables = Types.Exact<{
  goalsId: Array<Types.Scalars['Int']['input']> | Types.Scalars['Int']['input'];
  fromTs: Types.Scalars['DateTime']['input'];
  toTs: Types.Scalars['DateTime']['input'];
  prevFromTs: Types.Scalars['DateTime']['input'];
  prevToTs: Types.Scalars['DateTime']['input'];
}>;


export type GoalsStatisticsQuery = { __typename?: 'Query', goalStatistic: Array<{ __typename?: 'GoalStatisticGet', goalId: number, currentGroupByDate: { __typename?: 'DetalizationGraph', detalization: Types.Detalization, points: Array<{ __typename?: 'DetalizationGraphPoint', time: any, value: { __typename?: 'Value', conversion: number, achieved: number, views: number } }> }, prevGroupByDate: { __typename?: 'DetalizationGraph', detalization: Types.Detalization, points: Array<{ __typename?: 'DetalizationGraphPoint', time: any, value: { __typename?: 'Value', conversion: number, achieved: number, views: number } }> }, currentStatistic: { __typename?: 'StatisticGet', conversion: number, achieved: number, views: number }, prevStatistic: { __typename?: 'StatisticGet', conversion: number, achieved: number, views: number } }> };


export const GoalsStatisticsDocument = gql`
    query GoalsStatistics($goalsId: [Int!]!, $fromTs: DateTime!, $toTs: DateTime!, $prevFromTs: DateTime!, $prevToTs: DateTime!) {
  goalStatistic(
    statisticFilter: {dataIds: $goalsId, fromTs: $fromTs, toTs: $toTs, prevFromTs: $prevFromTs, prevToTs: $prevToTs}
  ) {
    goalId
    currentGroupByDate {
      detalization
      points {
        time
        value {
          conversion
          achieved
          views
        }
      }
    }
    prevGroupByDate {
      detalization
      points {
        time
        value {
          conversion
          achieved
          views
        }
      }
    }
    currentStatistic {
      conversion
      achieved
      views
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
 * __useGoalsStatisticsQuery__
 *
 * To run a query within a React component, call `useGoalsStatisticsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGoalsStatisticsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGoalsStatisticsQuery({
 *   variables: {
 *      goalsId: // value for 'goalsId'
 *      fromTs: // value for 'fromTs'
 *      toTs: // value for 'toTs'
 *      prevFromTs: // value for 'prevFromTs'
 *      prevToTs: // value for 'prevToTs'
 *   },
 * });
 */
export function useGoalsStatisticsQuery(baseOptions: Apollo.QueryHookOptions<GoalsStatisticsQuery, GoalsStatisticsQueryVariables> & ({ variables: GoalsStatisticsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GoalsStatisticsQuery, GoalsStatisticsQueryVariables>(GoalsStatisticsDocument, options);
      }
export function useGoalsStatisticsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GoalsStatisticsQuery, GoalsStatisticsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GoalsStatisticsQuery, GoalsStatisticsQueryVariables>(GoalsStatisticsDocument, options);
        }
export function useGoalsStatisticsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GoalsStatisticsQuery, GoalsStatisticsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GoalsStatisticsQuery, GoalsStatisticsQueryVariables>(GoalsStatisticsDocument, options);
        }
export type GoalsStatisticsQueryHookResult = ReturnType<typeof useGoalsStatisticsQuery>;
export type GoalsStatisticsLazyQueryHookResult = ReturnType<typeof useGoalsStatisticsLazyQuery>;
export type GoalsStatisticsSuspenseQueryHookResult = ReturnType<typeof useGoalsStatisticsSuspenseQuery>;
export type GoalsStatisticsQueryResult = Apollo.QueryResult<GoalsStatisticsQuery, GoalsStatisticsQueryVariables>;