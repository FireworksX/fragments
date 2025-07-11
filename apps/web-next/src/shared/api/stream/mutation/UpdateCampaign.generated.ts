import * as Types from '../../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateCampaignMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
  name?: Types.InputMaybe<Types.Scalars['String']['input']>;
  status?: Types.InputMaybe<Types.CampaignStatus>;
}>;


export type UpdateCampaignMutation = { __typename?: 'Mutation', updateCampaign: { __typename?: 'CampaignGet', id: number, name: string, status: Types.CampaignStatus } };


export const UpdateCampaignDocument = gql`
    mutation UpdateCampaign($id: Int!, $name: String, $status: CampaignStatus) {
  updateCampaign(cmp: {id: $id, name: $name, status: $status}) {
    id
    name
    status
  }
}
    `;
export type UpdateCampaignMutationFn = Apollo.MutationFunction<UpdateCampaignMutation, UpdateCampaignMutationVariables>;

/**
 * __useUpdateCampaignMutation__
 *
 * To run a mutation, you first call `useUpdateCampaignMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCampaignMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCampaignMutation, { data, loading, error }] = useUpdateCampaignMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useUpdateCampaignMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCampaignMutation, UpdateCampaignMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCampaignMutation, UpdateCampaignMutationVariables>(UpdateCampaignDocument, options);
      }
export type UpdateCampaignMutationHookResult = ReturnType<typeof useUpdateCampaignMutation>;
export type UpdateCampaignMutationResult = Apollo.MutationResult<UpdateCampaignMutation>;
export type UpdateCampaignMutationOptions = Apollo.BaseMutationOptions<UpdateCampaignMutation, UpdateCampaignMutationVariables>;
