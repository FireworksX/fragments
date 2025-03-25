import * as Types from '../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateLandingMutationVariables = Types.Exact<{
  landingId: Types.Scalars['Int']['input'];
  name?: Types.InputMaybe<Types.Scalars['String']['input']>;
  active?: Types.InputMaybe<Types.Scalars['Boolean']['input']>;
  weight?: Types.InputMaybe<Types.Scalars['Float']['input']>;
  fragmentId?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type UpdateLandingMutation = { __typename?: 'Mutation', updateLanding: { __typename?: 'LandingGet', id: number, name: string, active: boolean, weight?: number | null, props?: any | null, fragment?: { __typename?: 'FragmentGet', id: number, name: string } | null } };


export const UpdateLandingDocument = gql`
    mutation UpdateLanding($landingId: Int!, $name: String, $active: Boolean, $weight: Float, $fragmentId: Int) {
  updateLanding(
    landing: {id: $landingId, name: $name, active: $active, weight: $weight, fragmentId: $fragmentId}
  ) {
    id
    name
    active
    fragment {
      id
      name
    }
    weight
    props
  }
}
    `;
export type UpdateLandingMutationFn = Apollo.MutationFunction<UpdateLandingMutation, UpdateLandingMutationVariables>;

/**
 * __useUpdateLandingMutation__
 *
 * To run a mutation, you first call `useUpdateLandingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateLandingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateLandingMutation, { data, loading, error }] = useUpdateLandingMutation({
 *   variables: {
 *      landingId: // value for 'landingId'
 *      name: // value for 'name'
 *      active: // value for 'active'
 *      weight: // value for 'weight'
 *      fragmentId: // value for 'fragmentId'
 *   },
 * });
 */
export function useUpdateLandingMutation(baseOptions?: Apollo.MutationHookOptions<UpdateLandingMutation, UpdateLandingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateLandingMutation, UpdateLandingMutationVariables>(UpdateLandingDocument, options);
      }
export type UpdateLandingMutationHookResult = ReturnType<typeof useUpdateLandingMutation>;
export type UpdateLandingMutationResult = Apollo.MutationResult<UpdateLandingMutation>;
export type UpdateLandingMutationOptions = Apollo.BaseMutationOptions<UpdateLandingMutation, UpdateLandingMutationVariables>;