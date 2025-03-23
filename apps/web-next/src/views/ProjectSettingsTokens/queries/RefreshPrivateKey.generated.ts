import * as Types from '../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RefreshPrivateKeyMutationVariables = Types.Exact<{
  projectId: Types.Scalars['Int']['input'];
}>;


export type RefreshPrivateKeyMutation = { __typename?: 'Mutation', changeProjectPrivateKey: { __typename?: 'ProjectGet', id: number, privateKey?: string | null } };


export const RefreshPrivateKeyDocument = gql`
    mutation RefreshPrivateKey($projectId: Int!) {
  changeProjectPrivateKey(projectId: $projectId) {
    id
    privateKey
  }
}
    `;
export type RefreshPrivateKeyMutationFn = Apollo.MutationFunction<RefreshPrivateKeyMutation, RefreshPrivateKeyMutationVariables>;

/**
 * __useRefreshPrivateKeyMutation__
 *
 * To run a mutation, you first call `useRefreshPrivateKeyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshPrivateKeyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshPrivateKeyMutation, { data, loading, error }] = useRefreshPrivateKeyMutation({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useRefreshPrivateKeyMutation(baseOptions?: Apollo.MutationHookOptions<RefreshPrivateKeyMutation, RefreshPrivateKeyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RefreshPrivateKeyMutation, RefreshPrivateKeyMutationVariables>(RefreshPrivateKeyDocument, options);
      }
export type RefreshPrivateKeyMutationHookResult = ReturnType<typeof useRefreshPrivateKeyMutation>;
export type RefreshPrivateKeyMutationResult = Apollo.MutationResult<RefreshPrivateKeyMutation>;
export type RefreshPrivateKeyMutationOptions = Apollo.BaseMutationOptions<RefreshPrivateKeyMutation, RefreshPrivateKeyMutationVariables>;