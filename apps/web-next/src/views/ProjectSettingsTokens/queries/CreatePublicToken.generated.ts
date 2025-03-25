import * as Types from '../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreatePublicTokenMutationVariables = Types.Exact<{
  projectId: Types.Scalars['Int']['input'];
  name: Types.Scalars['String']['input'];
}>;


export type CreatePublicTokenMutation = { __typename?: 'Mutation', addProjectPublicKey: { __typename?: 'ProjectGet', id: number, publicKeys: Array<{ __typename?: 'ProjectKeyGet', id: number, name?: string | null, value: string }> } };


export const CreatePublicTokenDocument = gql`
    mutation CreatePublicToken($projectId: Int!, $name: String!) {
  addProjectPublicKey(projectId: $projectId, publicKeyName: $name) {
    id
    publicKeys {
      id
      name
      value
    }
  }
}
    `;
export type CreatePublicTokenMutationFn = Apollo.MutationFunction<CreatePublicTokenMutation, CreatePublicTokenMutationVariables>;

/**
 * __useCreatePublicTokenMutation__
 *
 * To run a mutation, you first call `useCreatePublicTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePublicTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPublicTokenMutation, { data, loading, error }] = useCreatePublicTokenMutation({
 *   variables: {
 *      projectId: // value for 'projectId'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreatePublicTokenMutation(baseOptions?: Apollo.MutationHookOptions<CreatePublicTokenMutation, CreatePublicTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePublicTokenMutation, CreatePublicTokenMutationVariables>(CreatePublicTokenDocument, options);
      }
export type CreatePublicTokenMutationHookResult = ReturnType<typeof useCreatePublicTokenMutation>;
export type CreatePublicTokenMutationResult = Apollo.MutationResult<CreatePublicTokenMutation>;
export type CreatePublicTokenMutationOptions = Apollo.BaseMutationOptions<CreatePublicTokenMutation, CreatePublicTokenMutationVariables>;