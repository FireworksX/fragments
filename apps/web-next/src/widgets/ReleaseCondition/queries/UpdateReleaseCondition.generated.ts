import * as Types from '../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateReleaseConditionMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
  conditions: Array<Types.ConditionPost> | Types.ConditionPost;
}>;


export type UpdateReleaseConditionMutation = { __typename?: 'Mutation', updateReleaseCondition: { __typename?: 'ReleaseConditionGet', id: number, conditionSets: Array<{ __typename?: 'ConditionSetGet', id: number, conditions: Array<{ __typename?: 'ConditionGet', id: number, name: string, filterData?: { __typename?: 'FilterDeviceTypeGet', deviceTypes: Array<Types.DeviceType> } | { __typename?: 'FilterGeoLocationsGet' } | { __typename?: 'FilterOSTypeGet', osTypes: Array<Types.OsType> } | { __typename?: 'FilterPageGet' } | { __typename?: 'FilterTimeFramesGet' } | null }> }> } };


export const UpdateReleaseConditionDocument = gql`
    mutation UpdateReleaseCondition($id: Int!, $conditions: [ConditionPost!]!) {
  updateReleaseCondition(
    releaseCondition: {id: $id, conditionSets: [{name: "default", conditions: $conditions}]}
  ) {
    id
    conditionSets {
      id
      conditions {
        id
        name
        filterData {
          ... on FilterDeviceTypeGet {
            deviceTypes
          }
          ... on FilterOSTypeGet {
            osTypes
          }
        }
      }
    }
  }
}
    `;
export type UpdateReleaseConditionMutationFn = Apollo.MutationFunction<UpdateReleaseConditionMutation, UpdateReleaseConditionMutationVariables>;

/**
 * __useUpdateReleaseConditionMutation__
 *
 * To run a mutation, you first call `useUpdateReleaseConditionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateReleaseConditionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateReleaseConditionMutation, { data, loading, error }] = useUpdateReleaseConditionMutation({
 *   variables: {
 *      id: // value for 'id'
 *      conditions: // value for 'conditions'
 *   },
 * });
 */
export function useUpdateReleaseConditionMutation(baseOptions?: Apollo.MutationHookOptions<UpdateReleaseConditionMutation, UpdateReleaseConditionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateReleaseConditionMutation, UpdateReleaseConditionMutationVariables>(UpdateReleaseConditionDocument, options);
      }
export type UpdateReleaseConditionMutationHookResult = ReturnType<typeof useUpdateReleaseConditionMutation>;
export type UpdateReleaseConditionMutationResult = Apollo.MutationResult<UpdateReleaseConditionMutation>;
export type UpdateReleaseConditionMutationOptions = Apollo.BaseMutationOptions<UpdateReleaseConditionMutation, UpdateReleaseConditionMutationVariables>;