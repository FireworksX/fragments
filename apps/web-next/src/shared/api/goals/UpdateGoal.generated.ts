import * as Types from '../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateGoalMutationVariables = Types.Exact<{
  goalId: Types.Scalars['Int']['input'];
  name?: Types.InputMaybe<Types.Scalars['String']['input']>;
  code?: Types.InputMaybe<Types.Scalars['String']['input']>;
  max?: Types.InputMaybe<Types.Scalars['Float']['input']>;
  min?: Types.InputMaybe<Types.Scalars['Float']['input']>;
}>;


export type UpdateGoalMutation = { __typename?: 'Mutation', updateProjectGoal: { __typename?: 'ProjectGoalGet', id: number, name: string, code: string, min?: number | null, max?: number | null } };


export const UpdateGoalDocument = gql`
    mutation UpdateGoal($goalId: Int!, $name: String, $code: String, $max: Float, $min: Float) {
  updateProjectGoal(
    goal: {id: $goalId, name: $name, targetAction: $code, successLevel: $max, failureLevel: $min}
  ) {
    id
    name
    code: targetAction
    min: failureLevel
    max: successLevel
  }
}
    `;
export type UpdateGoalMutationFn = Apollo.MutationFunction<UpdateGoalMutation, UpdateGoalMutationVariables>;

/**
 * __useUpdateGoalMutation__
 *
 * To run a mutation, you first call `useUpdateGoalMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateGoalMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateGoalMutation, { data, loading, error }] = useUpdateGoalMutation({
 *   variables: {
 *      goalId: // value for 'goalId'
 *      name: // value for 'name'
 *      code: // value for 'code'
 *      max: // value for 'max'
 *      min: // value for 'min'
 *   },
 * });
 */
export function useUpdateGoalMutation(baseOptions?: Apollo.MutationHookOptions<UpdateGoalMutation, UpdateGoalMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateGoalMutation, UpdateGoalMutationVariables>(UpdateGoalDocument, options);
      }
export type UpdateGoalMutationHookResult = ReturnType<typeof useUpdateGoalMutation>;
export type UpdateGoalMutationResult = Apollo.MutationResult<UpdateGoalMutation>;
export type UpdateGoalMutationOptions = Apollo.BaseMutationOptions<UpdateGoalMutation, UpdateGoalMutationVariables>;