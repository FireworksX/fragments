import * as Types from '../../../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type EqualizeRolloutMutationVariables = Types.Exact<{
  featureFlagId: Types.Scalars['Int']['input'];
}>;


export type EqualizeRolloutMutation = { __typename?: 'Mutation', normalizeVariantsRolloutPercentage?: any | null };


export const EqualizeRolloutDocument = gql`
    mutation EqualizeRollout($featureFlagId: Int!) {
  normalizeVariantsRolloutPercentage(featureFlagId: $featureFlagId)
}
    `;
export type EqualizeRolloutMutationFn = Apollo.MutationFunction<EqualizeRolloutMutation, EqualizeRolloutMutationVariables>;

/**
 * __useEqualizeRolloutMutation__
 *
 * To run a mutation, you first call `useEqualizeRolloutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEqualizeRolloutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [equalizeRolloutMutation, { data, loading, error }] = useEqualizeRolloutMutation({
 *   variables: {
 *      featureFlagId: // value for 'featureFlagId'
 *   },
 * });
 */
export function useEqualizeRolloutMutation(baseOptions?: Apollo.MutationHookOptions<EqualizeRolloutMutation, EqualizeRolloutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EqualizeRolloutMutation, EqualizeRolloutMutationVariables>(EqualizeRolloutDocument, options);
      }
export type EqualizeRolloutMutationHookResult = ReturnType<typeof useEqualizeRolloutMutation>;
export type EqualizeRolloutMutationResult = Apollo.MutationResult<EqualizeRolloutMutation>;
export type EqualizeRolloutMutationOptions = Apollo.BaseMutationOptions<EqualizeRolloutMutation, EqualizeRolloutMutationVariables>;