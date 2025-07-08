import * as Types from '../../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateFeatureFlagMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
  name?: Types.InputMaybe<Types.Scalars['String']['input']>;
  rotationType?: Types.InputMaybe<Types.RotationType>;
}>;


export type UpdateFeatureFlagMutation = { __typename?: 'Mutation', updateFeatureFlag: { __typename?: 'FeatureFlagGet', id: number, name: string, rotationType: Types.RotationType } };


export const UpdateFeatureFlagDocument = gql`
    mutation UpdateFeatureFlag($id: Int!, $name: String, $rotationType: RotationType) {
  updateFeatureFlag(
    featureFlag: {id: $id, name: $name, rotationType: $rotationType}
  ) {
    id
    name
    rotationType
  }
}
    `;
export type UpdateFeatureFlagMutationFn = Apollo.MutationFunction<UpdateFeatureFlagMutation, UpdateFeatureFlagMutationVariables>;

/**
 * __useUpdateFeatureFlagMutation__
 *
 * To run a mutation, you first call `useUpdateFeatureFlagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateFeatureFlagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateFeatureFlagMutation, { data, loading, error }] = useUpdateFeatureFlagMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      rotationType: // value for 'rotationType'
 *   },
 * });
 */
export function useUpdateFeatureFlagMutation(baseOptions?: Apollo.MutationHookOptions<UpdateFeatureFlagMutation, UpdateFeatureFlagMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateFeatureFlagMutation, UpdateFeatureFlagMutationVariables>(UpdateFeatureFlagDocument, options);
      }
export type UpdateFeatureFlagMutationHookResult = ReturnType<typeof useUpdateFeatureFlagMutation>;
export type UpdateFeatureFlagMutationResult = Apollo.MutationResult<UpdateFeatureFlagMutation>;
export type UpdateFeatureFlagMutationOptions = Apollo.BaseMutationOptions<UpdateFeatureFlagMutation, UpdateFeatureFlagMutationVariables>;
