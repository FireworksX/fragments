import * as Types from '../../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RemoveProjectOriginMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
  projectId: Types.Scalars['Int']['input'];
}>;


export type RemoveProjectOriginMutation = { __typename?: 'Mutation', deleteProjectAllowedOrigin?: any | null };


export const RemoveProjectOriginDocument = gql`
    mutation RemoveProjectOrigin($id: Int!, $projectId: Int!) {
  deleteProjectAllowedOrigin(allowedOriginId: $id, projectId: $projectId)
}
    `;
export type RemoveProjectOriginMutationFn = Apollo.MutationFunction<RemoveProjectOriginMutation, RemoveProjectOriginMutationVariables>;

/**
 * __useRemoveProjectOriginMutation__
 *
 * To run a mutation, you first call `useRemoveProjectOriginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveProjectOriginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeProjectOriginMutation, { data, loading, error }] = useRemoveProjectOriginMutation({
 *   variables: {
 *      id: // value for 'id'
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useRemoveProjectOriginMutation(baseOptions?: Apollo.MutationHookOptions<RemoveProjectOriginMutation, RemoveProjectOriginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveProjectOriginMutation, RemoveProjectOriginMutationVariables>(RemoveProjectOriginDocument, options);
      }
export type RemoveProjectOriginMutationHookResult = ReturnType<typeof useRemoveProjectOriginMutation>;
export type RemoveProjectOriginMutationResult = Apollo.MutationResult<RemoveProjectOriginMutation>;
export type RemoveProjectOriginMutationOptions = Apollo.BaseMutationOptions<RemoveProjectOriginMutation, RemoveProjectOriginMutationVariables>;