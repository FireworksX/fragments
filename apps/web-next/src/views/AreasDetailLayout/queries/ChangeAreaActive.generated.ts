import * as Types from '../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ChangeAreaActiveMutationVariables = Types.Exact<{
  defaultCampaignId: Types.Scalars['Int']['input'];
  active: Types.Scalars['Boolean']['input'];
}>;


export type ChangeAreaActiveMutation = { __typename?: 'Mutation', updateCampaign: { __typename?: 'CampaignGet', id: number, active: boolean } };


export const ChangeAreaActiveDocument = gql`
    mutation ChangeAreaActive($defaultCampaignId: Int!, $active: Boolean!) {
  updateCampaign(cmp: {id: $defaultCampaignId, active: $active}) {
    id
    active
  }
}
    `;
export type ChangeAreaActiveMutationFn = Apollo.MutationFunction<ChangeAreaActiveMutation, ChangeAreaActiveMutationVariables>;

/**
 * __useChangeAreaActiveMutation__
 *
 * To run a mutation, you first call `useChangeAreaActiveMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeAreaActiveMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeAreaActiveMutation, { data, loading, error }] = useChangeAreaActiveMutation({
 *   variables: {
 *      defaultCampaignId: // value for 'defaultCampaignId'
 *      active: // value for 'active'
 *   },
 * });
 */
export function useChangeAreaActiveMutation(baseOptions?: Apollo.MutationHookOptions<ChangeAreaActiveMutation, ChangeAreaActiveMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeAreaActiveMutation, ChangeAreaActiveMutationVariables>(ChangeAreaActiveDocument, options);
      }
export type ChangeAreaActiveMutationHookResult = ReturnType<typeof useChangeAreaActiveMutation>;
export type ChangeAreaActiveMutationResult = Apollo.MutationResult<ChangeAreaActiveMutation>;
export type ChangeAreaActiveMutationOptions = Apollo.BaseMutationOptions<ChangeAreaActiveMutation, ChangeAreaActiveMutationVariables>;