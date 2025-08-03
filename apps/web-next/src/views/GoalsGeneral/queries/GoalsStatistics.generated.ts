import * as Types from '../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GoalsStatisticsQueryVariables = Types.Exact<{
  goalId: Types.Scalars['Int']['input'];
  from?: Types.InputMaybe<Types.Scalars['DateTime']['input']>;
  to?: Types.InputMaybe<Types.Scalars['DateTime']['input']>;
}>;


export type GoalsStatisticsQuery = { __typename?: 'Query', goalStats: { __typename?: 'GoalStatsGet', graph: Array<{ __typename?: 'GraphPoint', x: any, y: { __typename?: 'Value', achieved: number, conversion: number } }> } };


export const GoalsStatisticsDocument = gql`
    query GoalsStatistics($goalId: Int!, $from: DateTime, $to: DateTime) {
  goalStats(goalId: $goalId, fromTs: $from, toTs: $to) {
    graph {
      x
      y {
        achieved
        conversion
      }
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
 *      goalId: // value for 'goalId'
 *      from: // value for 'from'
 *      to: // value for 'to'
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