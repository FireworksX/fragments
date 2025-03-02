import * as Types from '../../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateProjectDirectoryMutationVariables = Types.Exact<{
  projectSlug: Types.Scalars['Int']['input'];
  name: Types.Scalars['String']['input'];
  parentId: Types.Scalars['Int']['input'];
}>;


export type CreateProjectDirectoryMutation = { __typename?: 'Mutation', createDirectory: Array<{ __typename?: 'ProjectDirectoryGet', id: number, name: string, parentId?: number | null, projectId: number }> };


export const CreateProjectDirectoryDocument = gql`
    mutation CreateProjectDirectory($projectSlug: Int!, $name: String!, $parentId: Int!) {
  createDirectory(
    directory: {projectId: $projectSlug, name: $name, parentId: $parentId}
  ) {
    id
    name
    parentId
    projectId
  }
}
    `;
export type CreateProjectDirectoryMutationFn = Apollo.MutationFunction<CreateProjectDirectoryMutation, CreateProjectDirectoryMutationVariables>;

/**
 * __useCreateProjectDirectoryMutation__
 *
 * To run a mutation, you first call `useCreateProjectDirectoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProjectDirectoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProjectDirectoryMutation, { data, loading, error }] = useCreateProjectDirectoryMutation({
 *   variables: {
 *      projectSlug: // value for 'projectSlug'
 *      name: // value for 'name'
 *      parentId: // value for 'parentId'
 *   },
 * });
 */
export function useCreateProjectDirectoryMutation(baseOptions?: Apollo.MutationHookOptions<CreateProjectDirectoryMutation, CreateProjectDirectoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProjectDirectoryMutation, CreateProjectDirectoryMutationVariables>(CreateProjectDirectoryDocument, options);
      }
export type CreateProjectDirectoryMutationHookResult = ReturnType<typeof useCreateProjectDirectoryMutation>;
export type CreateProjectDirectoryMutationResult = Apollo.MutationResult<CreateProjectDirectoryMutation>;
export type CreateProjectDirectoryMutationOptions = Apollo.BaseMutationOptions<CreateProjectDirectoryMutation, CreateProjectDirectoryMutationVariables>;