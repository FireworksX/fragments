import * as Types from '../../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateProjectDirectoryMutationVariables = Types.Exact<{
  directoryId: Types.Scalars['Int']['input'];
  name?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type UpdateProjectDirectoryMutation = { __typename?: 'Mutation', updateDirectory: Array<{ __typename?: 'ProjectDirectoryGet', id: number, name: string }> };


export const UpdateProjectDirectoryDocument = gql`
    mutation UpdateProjectDirectory($directoryId: Int!, $name: String) {
  updateDirectory(directory: {id: $directoryId, name: $name}) {
    id
    name
  }
}
    `;
export type UpdateProjectDirectoryMutationFn = Apollo.MutationFunction<UpdateProjectDirectoryMutation, UpdateProjectDirectoryMutationVariables>;

/**
 * __useUpdateProjectDirectoryMutation__
 *
 * To run a mutation, you first call `useUpdateProjectDirectoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProjectDirectoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProjectDirectoryMutation, { data, loading, error }] = useUpdateProjectDirectoryMutation({
 *   variables: {
 *      directoryId: // value for 'directoryId'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useUpdateProjectDirectoryMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProjectDirectoryMutation, UpdateProjectDirectoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProjectDirectoryMutation, UpdateProjectDirectoryMutationVariables>(UpdateProjectDirectoryDocument, options);
      }
export type UpdateProjectDirectoryMutationHookResult = ReturnType<typeof useUpdateProjectDirectoryMutation>;
export type UpdateProjectDirectoryMutationResult = Apollo.MutationResult<UpdateProjectDirectoryMutation>;
export type UpdateProjectDirectoryMutationOptions = Apollo.BaseMutationOptions<UpdateProjectDirectoryMutation, UpdateProjectDirectoryMutationVariables>;