import * as Types from '../../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DeleteProjectFragmentMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
}>;


export type DeleteProjectFragmentMutation = { __typename?: 'Mutation', deleteFragment?: any | null };


export const DeleteProjectFragmentDocument = gql`
    mutation DeleteProjectFragment($id: Int!) {
  deleteFragment(fragmentId: $id)
}
    `;
export type DeleteProjectFragmentMutationFn = Apollo.MutationFunction<DeleteProjectFragmentMutation, DeleteProjectFragmentMutationVariables>;

/**
 * __useDeleteProjectFragmentMutation__
 *
 * To run a mutation, you first call `useDeleteProjectFragmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProjectFragmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProjectFragmentMutation, { data, loading, error }] = useDeleteProjectFragmentMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteProjectFragmentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteProjectFragmentMutation, DeleteProjectFragmentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteProjectFragmentMutation, DeleteProjectFragmentMutationVariables>(DeleteProjectFragmentDocument, options);
      }
export type DeleteProjectFragmentMutationHookResult = ReturnType<typeof useDeleteProjectFragmentMutation>;
export type DeleteProjectFragmentMutationResult = Apollo.MutationResult<DeleteProjectFragmentMutation>;
export type DeleteProjectFragmentMutationOptions = Apollo.BaseMutationOptions<DeleteProjectFragmentMutation, DeleteProjectFragmentMutationVariables>;