import * as Types from '../../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DeleteCampaignMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
}>;


export type DeleteCampaignMutation = { __typename?: 'Mutation', deleteCampaign?: any | null };


export const DeleteCampaignDocument = gql`
    mutation DeleteCampaign($id: Int!) {
  deleteCampaign(campaignId: $id)
}
    `;
export type DeleteCampaignMutationFn = Apollo.MutationFunction<DeleteCampaignMutation, DeleteCampaignMutationVariables>;

/**
 * __useDeleteCampaignMutation__
 *
 * To run a mutation, you first call `useDeleteCampaignMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCampaignMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCampaignMutation, { data, loading, error }] = useDeleteCampaignMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCampaignMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCampaignMutation, DeleteCampaignMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCampaignMutation, DeleteCampaignMutationVariables>(DeleteCampaignDocument, options);
      }
export type DeleteCampaignMutationHookResult = ReturnType<typeof useDeleteCampaignMutation>;
export type DeleteCampaignMutationResult = Apollo.MutationResult<DeleteCampaignMutation>;
export type DeleteCampaignMutationOptions = Apollo.BaseMutationOptions<DeleteCampaignMutation, DeleteCampaignMutationVariables>;