import * as Types from '../../../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateAreaMutationVariables = Types.Exact<{
  name: Types.Scalars['String']['input'];
  description?: Types.InputMaybe<Types.Scalars['String']['input']>;
  projectId: Types.Scalars['Int']['input'];
}>;


export type CreateAreaMutation = { __typename?: 'Mutation', createArea: { __typename?: 'AreaGet', name: string, description?: string | null, defaultCampaign: { __typename?: 'CampaignGet', active: boolean } } };


export const CreateAreaDocument = gql`
    mutation CreateArea($name: String!, $description: String, $projectId: Int!) {
  createArea(
    area: {name: $name, description: $description, projectId: $projectId}
  ) {
    name
    description
    defaultCampaign {
      active
    }
  }
}
    `;
export type CreateAreaMutationFn = Apollo.MutationFunction<CreateAreaMutation, CreateAreaMutationVariables>;

/**
 * __useCreateAreaMutation__
 *
 * To run a mutation, you first call `useCreateAreaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAreaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAreaMutation, { data, loading, error }] = useCreateAreaMutation({
 *   variables: {
 *      name: // value for 'name'
 *      description: // value for 'description'
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useCreateAreaMutation(baseOptions?: Apollo.MutationHookOptions<CreateAreaMutation, CreateAreaMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAreaMutation, CreateAreaMutationVariables>(CreateAreaDocument, options);
      }
export type CreateAreaMutationHookResult = ReturnType<typeof useCreateAreaMutation>;
export type CreateAreaMutationResult = Apollo.MutationResult<CreateAreaMutation>;
export type CreateAreaMutationOptions = Apollo.BaseMutationOptions<CreateAreaMutation, CreateAreaMutationVariables>;