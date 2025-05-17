import * as Types from '../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateStreamMutationVariables = Types.Exact<{
  name: Types.Scalars['String']['input'];
  active: Types.Scalars['Boolean']['input'];
  weight: Types.Scalars['Float']['input'];
  campaignId: Types.Scalars['Int']['input'];
}>;


export type CreateStreamMutation = { __typename?: 'Mutation', createStream: { __typename?: 'StreamGet', id: number, name: string, weight: number, active: boolean } };


export const CreateStreamDocument = gql`
    mutation CreateStream($name: String!, $active: Boolean!, $weight: Float!, $campaignId: Int!) {
  createStream(
    stream: {name: $name, active: $active, weight: $weight, deleted: false, campaignId: $campaignId}
  ) {
    id
    name
    weight
    active
  }
}
    `;
export type CreateStreamMutationFn = Apollo.MutationFunction<CreateStreamMutation, CreateStreamMutationVariables>;

/**
 * __useCreateStreamMutation__
 *
 * To run a mutation, you first call `useCreateStreamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateStreamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createStreamMutation, { data, loading, error }] = useCreateStreamMutation({
 *   variables: {
 *      name: // value for 'name'
 *      active: // value for 'active'
 *      weight: // value for 'weight'
 *      campaignId: // value for 'campaignId'
 *   },
 * });
 */
export function useCreateStreamMutation(baseOptions?: Apollo.MutationHookOptions<CreateStreamMutation, CreateStreamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateStreamMutation, CreateStreamMutationVariables>(CreateStreamDocument, options);
      }
export type CreateStreamMutationHookResult = ReturnType<typeof useCreateStreamMutation>;
export type CreateStreamMutationResult = Apollo.MutationResult<CreateStreamMutation>;
export type CreateStreamMutationOptions = Apollo.BaseMutationOptions<CreateStreamMutation, CreateStreamMutationVariables>;