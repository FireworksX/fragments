import * as Types from '../../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateProjectFragmentMutationVariables = Types.Exact<{
  projectSlug: Types.Scalars['Int']['input'];
  name: Types.Scalars['String']['input'];
  parentId: Types.Scalars['Int']['input'];
  document: Types.Scalars['JSON']['input'];
}>;


export type CreateProjectFragmentMutation = { __typename?: 'Mutation', createFragment: { __typename?: 'FragmentGet', id: number, name: string, directoryId: number } };


export const CreateProjectFragmentDocument = gql`
    mutation CreateProjectFragment($projectSlug: Int!, $name: String!, $parentId: Int!, $document: JSON!) {
  createFragment(
    fg: {name: $name, projectId: $projectSlug, document: $document, directoryId: $parentId}
  ) {
    id
    name
    directoryId
  }
}
    `;
export type CreateProjectFragmentMutationFn = Apollo.MutationFunction<CreateProjectFragmentMutation, CreateProjectFragmentMutationVariables>;

/**
 * __useCreateProjectFragmentMutation__
 *
 * To run a mutation, you first call `useCreateProjectFragmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProjectFragmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProjectFragmentMutation, { data, loading, error }] = useCreateProjectFragmentMutation({
 *   variables: {
 *      projectSlug: // value for 'projectSlug'
 *      name: // value for 'name'
 *      parentId: // value for 'parentId'
 *      document: // value for 'document'
 *   },
 * });
 */
export function useCreateProjectFragmentMutation(baseOptions?: Apollo.MutationHookOptions<CreateProjectFragmentMutation, CreateProjectFragmentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProjectFragmentMutation, CreateProjectFragmentMutationVariables>(CreateProjectFragmentDocument, options);
      }
export type CreateProjectFragmentMutationHookResult = ReturnType<typeof useCreateProjectFragmentMutation>;
export type CreateProjectFragmentMutationResult = Apollo.MutationResult<CreateProjectFragmentMutation>;
export type CreateProjectFragmentMutationOptions = Apollo.BaseMutationOptions<CreateProjectFragmentMutation, CreateProjectFragmentMutationVariables>;