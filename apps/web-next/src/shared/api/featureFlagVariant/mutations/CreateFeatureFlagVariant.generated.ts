import * as Types from '../../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateFeatureFlagVariantMutationVariables = Types.Exact<{
  featureFlagId: Types.Scalars['Int']['input'];
  name: Types.Scalars['String']['input'];
  rollout: Types.Scalars['Float']['input'];
  status: Types.VariantStatus;
  fragment: Types.FragmentVariantPost;
}>;


export type CreateFeatureFlagVariantMutation = { __typename?: 'Mutation', createVariant: { __typename?: 'VariantGet', id: number, name: string, status: Types.VariantStatus, rolloutPercentage: number, fragment?: { __typename?: 'FragmentVariantGet', props?: any | null, fragment: { __typename?: 'FragmentGet', id: number } } | null } };


export const CreateFeatureFlagVariantDocument = gql`
    mutation CreateFeatureFlagVariant($featureFlagId: Int!, $name: String!, $rollout: Float!, $status: VariantStatus!, $fragment: FragmentVariantPost!) {
  createVariant(
    variant: {featureFlagId: $featureFlagId, name: $name, rolloutPercentage: $rollout, status: $status, fragment: $fragment}
  ) {
    id
    name
    fragment {
      fragment {
        id
      }
      props
    }
    status
    rolloutPercentage
  }
}
    `;
export type CreateFeatureFlagVariantMutationFn = Apollo.MutationFunction<CreateFeatureFlagVariantMutation, CreateFeatureFlagVariantMutationVariables>;

/**
 * __useCreateFeatureFlagVariantMutation__
 *
 * To run a mutation, you first call `useCreateFeatureFlagVariantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFeatureFlagVariantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFeatureFlagVariantMutation, { data, loading, error }] = useCreateFeatureFlagVariantMutation({
 *   variables: {
 *      featureFlagId: // value for 'featureFlagId'
 *      name: // value for 'name'
 *      rollout: // value for 'rollout'
 *      status: // value for 'status'
 *      fragment: // value for 'fragment'
 *   },
 * });
 */
export function useCreateFeatureFlagVariantMutation(baseOptions?: Apollo.MutationHookOptions<CreateFeatureFlagVariantMutation, CreateFeatureFlagVariantMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateFeatureFlagVariantMutation, CreateFeatureFlagVariantMutationVariables>(CreateFeatureFlagVariantDocument, options);
      }
export type CreateFeatureFlagVariantMutationHookResult = ReturnType<typeof useCreateFeatureFlagVariantMutation>;
export type CreateFeatureFlagVariantMutationResult = Apollo.MutationResult<CreateFeatureFlagVariantMutation>;
export type CreateFeatureFlagVariantMutationOptions = Apollo.BaseMutationOptions<CreateFeatureFlagVariantMutation, CreateFeatureFlagVariantMutationVariables>;