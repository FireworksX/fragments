import * as Types from '../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RemovePublicTokenMutationVariables = Types.Exact<{
  publicKeyId: Types.Scalars['Int']['input'];
  projectId: Types.Scalars['Int']['input'];
}>;


export type RemovePublicTokenMutation = { __typename?: 'Mutation', deleteProjectPublicKey?: any | null };


export const RemovePublicTokenDocument = gql`
    mutation RemovePublicToken($publicKeyId: Int!, $projectId: Int!) {
  deleteProjectPublicKey(publicKeyId: $publicKeyId, projectId: $projectId)
}
    `;
export type RemovePublicTokenMutationFn = Apollo.MutationFunction<RemovePublicTokenMutation, RemovePublicTokenMutationVariables>;

/**
 * __useRemovePublicTokenMutation__
 *
 * To run a mutation, you first call `useRemovePublicTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemovePublicTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removePublicTokenMutation, { data, loading, error }] = useRemovePublicTokenMutation({
 *   variables: {
 *      publicKeyId: // value for 'publicKeyId'
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useRemovePublicTokenMutation(baseOptions?: Apollo.MutationHookOptions<RemovePublicTokenMutation, RemovePublicTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemovePublicTokenMutation, RemovePublicTokenMutationVariables>(RemovePublicTokenDocument, options);
      }
export type RemovePublicTokenMutationHookResult = ReturnType<typeof useRemovePublicTokenMutation>;
export type RemovePublicTokenMutationResult = Apollo.MutationResult<RemovePublicTokenMutation>;
export type RemovePublicTokenMutationOptions = Apollo.BaseMutationOptions<RemovePublicTokenMutation, RemovePublicTokenMutationVariables>;