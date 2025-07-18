import * as Types from '../../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateFeatureFlagVariantMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
  name?: Types.InputMaybe<Types.Scalars['String']['input']>;
  rollout?: Types.InputMaybe<Types.Scalars['Float']['input']>;
  status?: Types.InputMaybe<Types.VariantStatus>;
  fragment?: Types.InputMaybe<Types.FragmentVariantPatch>;
}>;


export type UpdateFeatureFlagVariantMutation = { __typename?: 'Mutation', updateVariant: { __typename?: 'VariantGet', id: number, name: string, status: Types.VariantStatus, rolloutPercentage: number, fragment?: { __typename?: 'FragmentVariantGet', props?: any | null, fragment: { __typename?: 'FragmentGet', id: number } } | null } };


export const UpdateFeatureFlagVariantDocument = gql`
    mutation UpdateFeatureFlagVariant($id: Int!, $name: String, $rollout: Float, $status: VariantStatus, $fragment: FragmentVariantPatch) {
  updateVariant(
    variant: {id: $id, name: $name, rolloutPercentage: $rollout, status: $status, fragment: $fragment}
  ) {
    id
    name
    fragment {
      fragment {
        id
      }
      props
    }
    status
    rolloutPercentage
  }
}
    `;
export type UpdateFeatureFlagVariantMutationFn = Apollo.MutationFunction<UpdateFeatureFlagVariantMutation, UpdateFeatureFlagVariantMutationVariables>;

/**
 * __useUpdateFeatureFlagVariantMutation__
 *
 * To run a mutation, you first call `useUpdateFeatureFlagVariantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateFeatureFlagVariantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateFeatureFlagVariantMutation, { data, loading, error }] = useUpdateFeatureFlagVariantMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      rollout: // value for 'rollout'
 *      status: // value for 'status'
 *      fragment: // value for 'fragment'
 *   },
 * });
 */
export function useUpdateFeatureFlagVariantMutation(baseOptions?: Apollo.MutationHookOptions<UpdateFeatureFlagVariantMutation, UpdateFeatureFlagVariantMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateFeatureFlagVariantMutation, UpdateFeatureFlagVariantMutationVariables>(UpdateFeatureFlagVariantDocument, options);
      }
export type UpdateFeatureFlagVariantMutationHookResult = ReturnType<typeof useUpdateFeatureFlagVariantMutation>;
export type UpdateFeatureFlagVariantMutationResult = Apollo.MutationResult<UpdateFeatureFlagVariantMutation>;
export type UpdateFeatureFlagVariantMutationOptions = Apollo.BaseMutationOptions<UpdateFeatureFlagVariantMutation, UpdateFeatureFlagVariantMutationVariables>;