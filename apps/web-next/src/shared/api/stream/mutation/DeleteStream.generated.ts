import * as Types from '../../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DeleteStreamMutationVariables = Types.Exact<{
  streamId: Types.Scalars['Int']['input'];
}>;


export type DeleteStreamMutation = { __typename?: 'Mutation', deleteStream?: any | null };


export const DeleteStreamDocument = gql`
    mutation DeleteStream($streamId: Int!) {
  deleteStream(streamId: $streamId)
}
    `;
export type DeleteStreamMutationFn = Apollo.MutationFunction<DeleteStreamMutation, DeleteStreamMutationVariables>;

/**
 * __useDeleteStreamMutation__
 *
 * To run a mutation, you first call `useDeleteStreamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteStreamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteStreamMutation, { data, loading, error }] = useDeleteStreamMutation({
 *   variables: {
 *      streamId: // value for 'streamId'
 *   },
 * });
 */
export function useDeleteStreamMutation(baseOptions?: Apollo.MutationHookOptions<DeleteStreamMutation, DeleteStreamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteStreamMutation, DeleteStreamMutationVariables>(DeleteStreamDocument, options);
      }
export type DeleteStreamMutationHookResult = ReturnType<typeof useDeleteStreamMutation>;
export type DeleteStreamMutationResult = Apollo.MutationResult<DeleteStreamMutation>;
export type DeleteStreamMutationOptions = Apollo.BaseMutationOptions<DeleteStreamMutation, DeleteStreamMutationVariables>;