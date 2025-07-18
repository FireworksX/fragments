import * as Types from '../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateReleaseConditionMutationVariables = Types.Exact<{
  projectId: Types.Scalars['Int']['input'];
  filterData: Types.FilterPost;
}>;


export type CreateReleaseConditionMutation = { __typename?: 'Mutation', createReleaseCondition: { __typename?: 'ReleaseConditionGet', id: number, conditionSets: Array<{ __typename?: 'ConditionSetGet', id: number, conditions: Array<{ __typename?: 'ConditionGet', id: number, filterData?: { __typename?: 'FilterDeviceTypeGet', deviceTypes: Array<Types.DeviceType> } | { __typename?: 'FilterGeoLocationsGet' } | { __typename?: 'FilterOSTypeGet' } | { __typename?: 'FilterPageGet' } | { __typename?: 'FilterTimeFramesGet' } | null }> }> } };


export const CreateReleaseConditionDocument = gql`
    mutation CreateReleaseCondition($projectId: Int!, $filterData: FilterPost!) {
  createReleaseCondition(
    releaseCondition: {projectId: $projectId, name: "default", conditionSets: [{name: "default", conditions: [{name: "default", filterData: $filterData}]}]}
  ) {
    id
    conditionSets {
      id
      conditions {
        id
        filterData {
          ... on FilterDeviceTypeGet {
            deviceTypes
          }
        }
      }
    }
  }
}
    `;
export type CreateReleaseConditionMutationFn = Apollo.MutationFunction<CreateReleaseConditionMutation, CreateReleaseConditionMutationVariables>;

/**
 * __useCreateReleaseConditionMutation__
 *
 * To run a mutation, you first call `useCreateReleaseConditionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateReleaseConditionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createReleaseConditionMutation, { data, loading, error }] = useCreateReleaseConditionMutation({
 *   variables: {
 *      projectId: // value for 'projectId'
 *      filterData: // value for 'filterData'
 *   },
 * });
 */
export function useCreateReleaseConditionMutation(baseOptions?: Apollo.MutationHookOptions<CreateReleaseConditionMutation, CreateReleaseConditionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateReleaseConditionMutation, CreateReleaseConditionMutationVariables>(CreateReleaseConditionDocument, options);
      }
export type CreateReleaseConditionMutationHookResult = ReturnType<typeof useCreateReleaseConditionMutation>;
export type CreateReleaseConditionMutationResult = Apollo.MutationResult<CreateReleaseConditionMutation>;
export type CreateReleaseConditionMutationOptions = Apollo.BaseMutationOptions<CreateReleaseConditionMutation, CreateReleaseConditionMutationVariables>;