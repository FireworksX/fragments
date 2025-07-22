import * as Types from '../../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DeleteAreaMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
}>;


export type DeleteAreaMutation = { __typename?: 'Mutation', deleteArea?: any | null };


export const DeleteAreaDocument = gql`
    mutation DeleteArea($id: Int!) {
  deleteArea(areaId: $id)
}
    `;
export type DeleteAreaMutationFn = Apollo.MutationFunction<DeleteAreaMutation, DeleteAreaMutationVariables>;

/**
 * __useDeleteAreaMutation__
 *
 * To run a mutation, you first call `useDeleteAreaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAreaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAreaMutation, { data, loading, error }] = useDeleteAreaMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteAreaMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAreaMutation, DeleteAreaMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteAreaMutation, DeleteAreaMutationVariables>(DeleteAreaDocument, options);
      }
export type DeleteAreaMutationHookResult = ReturnType<typeof useDeleteAreaMutation>;
export type DeleteAreaMutationResult = Apollo.MutationResult<DeleteAreaMutation>;
export type DeleteAreaMutationOptions = Apollo.BaseMutationOptions<DeleteAreaMutation, DeleteAreaMutationVariables>;