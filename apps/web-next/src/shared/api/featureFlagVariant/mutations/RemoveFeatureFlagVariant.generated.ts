import * as Types from '../../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RemoveFeatureFlagVariantMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
}>;


export type RemoveFeatureFlagVariantMutation = { __typename?: 'Mutation', deleteVariant?: any | null };


export const RemoveFeatureFlagVariantDocument = gql`
    mutation RemoveFeatureFlagVariant($id: Int!) {
  deleteVariant(variantId: $id)
}
    `;
export type RemoveFeatureFlagVariantMutationFn = Apollo.MutationFunction<RemoveFeatureFlagVariantMutation, RemoveFeatureFlagVariantMutationVariables>;

/**
 * __useRemoveFeatureFlagVariantMutation__
 *
 * To run a mutation, you first call `useRemoveFeatureFlagVariantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveFeatureFlagVariantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeFeatureFlagVariantMutation, { data, loading, error }] = useRemoveFeatureFlagVariantMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveFeatureFlagVariantMutation(baseOptions?: Apollo.MutationHookOptions<RemoveFeatureFlagVariantMutation, RemoveFeatureFlagVariantMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveFeatureFlagVariantMutation, RemoveFeatureFlagVariantMutationVariables>(RemoveFeatureFlagVariantDocument, options);
      }
export type RemoveFeatureFlagVariantMutationHookResult = ReturnType<typeof useRemoveFeatureFlagVariantMutation>;
export type RemoveFeatureFlagVariantMutationResult = Apollo.MutationResult<RemoveFeatureFlagVariantMutation>;
export type RemoveFeatureFlagVariantMutationOptions = Apollo.BaseMutationOptions<RemoveFeatureFlagVariantMutation, RemoveFeatureFlagVariantMutationVariables>;