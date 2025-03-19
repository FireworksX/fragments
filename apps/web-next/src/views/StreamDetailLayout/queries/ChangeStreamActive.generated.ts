import * as Types from '../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ChangeStreamActiveMutationVariables = Types.Exact<{
  streamSlug: Types.Scalars['Int']['input'];
  campaignSlug: Types.Scalars['Int']['input'];
  active: Types.Scalars['Boolean']['input'];
}>;


export type ChangeStreamActiveMutation = { __typename?: 'Mutation', updateStream: { __typename?: 'StreamGet', id: number, active: boolean } };


export const ChangeStreamActiveDocument = gql`
    mutation ChangeStreamActive($streamSlug: Int!, $campaignSlug: Int!, $active: Boolean!) {
  updateStream(
    strm: {id: $streamSlug, campaignId: $campaignSlug, active: $active}
  ) {
    id
    active
  }
}
    `;
export type ChangeStreamActiveMutationFn = Apollo.MutationFunction<ChangeStreamActiveMutation, ChangeStreamActiveMutationVariables>;

/**
 * __useChangeStreamActiveMutation__
 *
 * To run a mutation, you first call `useChangeStreamActiveMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeStreamActiveMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeStreamActiveMutation, { data, loading, error }] = useChangeStreamActiveMutation({
 *   variables: {
 *      streamSlug: // value for 'streamSlug'
 *      campaignSlug: // value for 'campaignSlug'
 *      active: // value for 'active'
 *   },
 * });
 */
export function useChangeStreamActiveMutation(baseOptions?: Apollo.MutationHookOptions<ChangeStreamActiveMutation, ChangeStreamActiveMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeStreamActiveMutation, ChangeStreamActiveMutationVariables>(ChangeStreamActiveDocument, options);
      }
export type ChangeStreamActiveMutationHookResult = ReturnType<typeof useChangeStreamActiveMutation>;
export type ChangeStreamActiveMutationResult = Apollo.MutationResult<ChangeStreamActiveMutation>;
export type ChangeStreamActiveMutationOptions = Apollo.BaseMutationOptions<ChangeStreamActiveMutation, ChangeStreamActiveMutationVariables>;