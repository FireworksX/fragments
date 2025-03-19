import * as Types from '../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateStreamMutationVariables = Types.Exact<{
  streamSlug: Types.Scalars['Int']['input'];
  campaignSlug: Types.Scalars['Int']['input'];
  name?: Types.InputMaybe<Types.Scalars['String']['input']>;
  active?: Types.InputMaybe<Types.Scalars['Boolean']['input']>;
}>;


export type UpdateStreamMutation = { __typename?: 'Mutation', updateStream: { __typename?: 'StreamGet', id: number, active: boolean, name: string } };


export const UpdateStreamDocument = gql`
    mutation UpdateStream($streamSlug: Int!, $campaignSlug: Int!, $name: String, $active: Boolean) {
  updateStream(
    strm: {id: $streamSlug, campaignId: $campaignSlug, active: $active, name: $name}
  ) {
    id
    active
    name
  }
}
    `;
export type UpdateStreamMutationFn = Apollo.MutationFunction<UpdateStreamMutation, UpdateStreamMutationVariables>;

/**
 * __useUpdateStreamMutation__
 *
 * To run a mutation, you first call `useUpdateStreamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateStreamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateStreamMutation, { data, loading, error }] = useUpdateStreamMutation({
 *   variables: {
 *      streamSlug: // value for 'streamSlug'
 *      campaignSlug: // value for 'campaignSlug'
 *      name: // value for 'name'
 *      active: // value for 'active'
 *   },
 * });
 */
export function useUpdateStreamMutation(baseOptions?: Apollo.MutationHookOptions<UpdateStreamMutation, UpdateStreamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateStreamMutation, UpdateStreamMutationVariables>(UpdateStreamDocument, options);
      }
export type UpdateStreamMutationHookResult = ReturnType<typeof useUpdateStreamMutation>;
export type UpdateStreamMutationResult = Apollo.MutationResult<UpdateStreamMutation>;
export type UpdateStreamMutationOptions = Apollo.BaseMutationOptions<UpdateStreamMutation, UpdateStreamMutationVariables>;