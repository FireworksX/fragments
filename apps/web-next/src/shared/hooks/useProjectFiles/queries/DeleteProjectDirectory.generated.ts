import * as Types from '../../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DeleteProjectDirectoryMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
}>;


export type DeleteProjectDirectoryMutation = { __typename?: 'Mutation', deleteDirectory?: any | null };


export const DeleteProjectDirectoryDocument = gql`
    mutation DeleteProjectDirectory($id: Int!) {
  deleteDirectory(directoryId: $id)
}
    `;
export type DeleteProjectDirectoryMutationFn = Apollo.MutationFunction<DeleteProjectDirectoryMutation, DeleteProjectDirectoryMutationVariables>;

/**
 * __useDeleteProjectDirectoryMutation__
 *
 * To run a mutation, you first call `useDeleteProjectDirectoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProjectDirectoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProjectDirectoryMutation, { data, loading, error }] = useDeleteProjectDirectoryMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteProjectDirectoryMutation(baseOptions?: Apollo.MutationHookOptions<DeleteProjectDirectoryMutation, DeleteProjectDirectoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteProjectDirectoryMutation, DeleteProjectDirectoryMutationVariables>(DeleteProjectDirectoryDocument, options);
      }
export type DeleteProjectDirectoryMutationHookResult = ReturnType<typeof useDeleteProjectDirectoryMutation>;
export type DeleteProjectDirectoryMutationResult = Apollo.MutationResult<DeleteProjectDirectoryMutation>;
export type DeleteProjectDirectoryMutationOptions = Apollo.BaseMutationOptions<DeleteProjectDirectoryMutation, DeleteProjectDirectoryMutationVariables>;