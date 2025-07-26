import * as Types from '../../../../__generated__/types';

import { gql } from '@apollo/client';
import { ReleaseConditionFragmentDoc } from '../../fragments/ReleaseConditionFragment.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateReleaseConditionMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
  conditions: Array<Types.ConditionPost> | Types.ConditionPost;
}>;


export type UpdateReleaseConditionMutation = { __typename?: 'Mutation', updateReleaseCondition: { __typename?: 'ReleaseConditionGet', id: number, name: string, conditionSets: Array<{ __typename?: 'ConditionSetGet', id: number, name: string, conditions: Array<{ __typename?: 'ConditionGet', id: number, name: string, filterData?: { __typename?: 'FilterDeviceTypeGet', deviceTypes: Array<Types.DeviceType> } | { __typename?: 'FilterGeoLocationsGet', geoLocations: Array<{ __typename?: 'FilterGeoLocationGet', country: string, region?: string | null, city?: string | null }> } | { __typename?: 'FilterOSTypeGet', osTypes: Array<Types.OsType> } | { __typename?: 'FilterPageGet', pages: Array<string> } | { __typename?: 'FilterTimeFramesGet', timeFrames: Array<{ __typename?: 'FilterTimeFrameGet', fromTime: any, toTime: any }> } | null }> }> } };


export const UpdateReleaseConditionDocument = gql`
    mutation UpdateReleaseCondition($id: Int!, $conditions: [ConditionPost!]!) {
  updateReleaseCondition(
    releaseCondition: {id: $id, conditionSets: [{name: "default", conditions: $conditions}]}
  ) {
    ...ReleaseCondition
  }
}
    ${ReleaseConditionFragmentDoc}`;
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