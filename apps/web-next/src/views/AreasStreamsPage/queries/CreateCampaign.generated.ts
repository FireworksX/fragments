import * as Types from '../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateCampaignMutationVariables = Types.Exact<{
  areaId: Types.Scalars['Int']['input'];
  name: Types.Scalars['String']['input'];
  active: Types.Scalars['Boolean']['input'];
  weight: Types.Scalars['Float']['input'];
}>;


export type CreateCampaignMutation = { __typename?: 'Mutation', createCampaign: { __typename?: 'CampaignGet', id: number, name: string, active: boolean } };


export const CreateCampaignDocument = gql`
    mutation CreateCampaign($areaId: Int!, $name: String!, $active: Boolean!, $weight: Float!) {
  createCampaign(
    cmp: {areaId: $areaId, name: $name, active: $active, weight: $weight, archived: true}
  ) {
    id
    name
    active
  }
}
    `;
export type CreateCampaignMutationFn = Apollo.MutationFunction<CreateCampaignMutation, CreateCampaignMutationVariables>;

/**
 * __useCreateCampaignMutation__
 *
 * To run a mutation, you first call `useCreateCampaignMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCampaignMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCampaignMutation, { data, loading, error }] = useCreateCampaignMutation({
 *   variables: {
 *      areaId: // value for 'areaId'
 *      name: // value for 'name'
 *      active: // value for 'active'
 *      weight: // value for 'weight'
 *   },
 * });
 */
export function useCreateCampaignMutation(baseOptions?: Apollo.MutationHookOptions<CreateCampaignMutation, CreateCampaignMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCampaignMutation, CreateCampaignMutationVariables>(CreateCampaignDocument, options);
      }
export type CreateCampaignMutationHookResult = ReturnType<typeof useCreateCampaignMutation>;
export type CreateCampaignMutationResult = Apollo.MutationResult<CreateCampaignMutation>;
export type CreateCampaignMutationOptions = Apollo.BaseMutationOptions<CreateCampaignMutation, CreateCampaignMutationVariables>;