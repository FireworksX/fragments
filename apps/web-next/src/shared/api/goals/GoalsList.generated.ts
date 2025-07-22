import * as Types from '../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GoalsListQueryVariables = Types.Exact<{
  projectSlug: Types.Scalars['Int']['input'];
}>;


export type GoalsListQuery = { __typename?: 'Query', projectGoals: Array<{ __typename?: 'ProjectGoalGet', id: number, name: string, code: string }> };


export const GoalsListDocument = gql`
    query GoalsList($projectSlug: Int!) {
  projectGoals(projectId: $projectSlug) {
    id
    name
    code: targetAction
  }
}
    `;

/**
 * __useGoalsListQuery__
 *
 * To run a query within a React component, call `useGoalsListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGoalsListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGoalsListQuery({
 *   variables: {
 *      projectSlug: // value for 'projectSlug'
 *   },
 * });
 */
export function useGoalsListQuery(baseOptions: Apollo.QueryHookOptions<GoalsListQuery, GoalsListQueryVariables> & ({ variables: GoalsListQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GoalsListQuery, GoalsListQueryVariables>(GoalsListDocument, options);
      }
export function useGoalsListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GoalsListQuery, GoalsListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GoalsListQuery, GoalsListQueryVariables>(GoalsListDocument, options);
        }
export function useGoalsListSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GoalsListQuery, GoalsListQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GoalsListQuery, GoalsListQueryVariables>(GoalsListDocument, options);
        }
export type GoalsListQueryHookResult = ReturnType<typeof useGoalsListQuery>;
export type GoalsListLazyQueryHookResult = ReturnType<typeof useGoalsListLazyQuery>;
export type GoalsListSuspenseQueryHookResult = ReturnType<typeof useGoalsListSuspenseQuery>;
export type GoalsListQueryResult = Apollo.QueryResult<GoalsListQuery, GoalsListQueryVariables>;