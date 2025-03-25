import * as Types from '../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ChangeCampaignActiveMutationVariables = Types.Exact<{
  campaignSlug: Types.Scalars['Int']['input'];
  active: Types.Scalars['Boolean']['input'];
}>;


export type ChangeCampaignActiveMutation = { __typename?: 'Mutation', updateCampaign: { __typename?: 'CampaignGet', id: number, active: boolean } };


export const ChangeCampaignActiveDocument = gql`
    mutation ChangeCampaignActive($campaignSlug: Int!, $active: Boolean!) {
  updateCampaign(cmp: {id: $campaignSlug, active: $active}) {
    id
    active
  }
}
    `;
export type ChangeCampaignActiveMutationFn = Apollo.MutationFunction<ChangeCampaignActiveMutation, ChangeCampaignActiveMutationVariables>;

/**
 * __useChangeCampaignActiveMutation__
 *
 * To run a mutation, you first call `useChangeCampaignActiveMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeCampaignActiveMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeCampaignActiveMutation, { data, loading, error }] = useChangeCampaignActiveMutation({
 *   variables: {
 *      campaignSlug: // value for 'campaignSlug'
 *      active: // value for 'active'
 *   },
 * });
 */
export function useChangeCampaignActiveMutation(baseOptions?: Apollo.MutationHookOptions<ChangeCampaignActiveMutation, ChangeCampaignActiveMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeCampaignActiveMutation, ChangeCampaignActiveMutationVariables>(ChangeCampaignActiveDocument, options);
      }
export type ChangeCampaignActiveMutationHookResult = ReturnType<typeof useChangeCampaignActiveMutation>;
export type ChangeCampaignActiveMutationResult = Apollo.MutationResult<ChangeCampaignActiveMutation>;
export type ChangeCampaignActiveMutationOptions = Apollo.BaseMutationOptions<ChangeCampaignActiveMutation, ChangeCampaignActiveMutationVariables>;