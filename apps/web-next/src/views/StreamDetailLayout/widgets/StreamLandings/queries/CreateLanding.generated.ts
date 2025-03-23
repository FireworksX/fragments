import * as Types from '../../../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateLandingMutationVariables = Types.Exact<{
  streamSlug: Types.Scalars['Int']['input'];
  name: Types.Scalars['String']['input'];
}>;


export type CreateLandingMutation = { __typename?: 'Mutation', createLanding: { __typename?: 'LandingGet', id: number, name: string, props?: any | null, weight?: number | null } };


export const CreateLandingDocument = gql`
    mutation CreateLanding($streamSlug: Int!, $name: String!) {
  createLanding(landings: {streamId: $streamSlug, name: $name}) {
    id
    name
    props
    weight
    props
  }
}
    `;
export type CreateLandingMutationFn = Apollo.MutationFunction<CreateLandingMutation, CreateLandingMutationVariables>;

/**
 * __useCreateLandingMutation__
 *
 * To run a mutation, you first call `useCreateLandingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLandingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLandingMutation, { data, loading, error }] = useCreateLandingMutation({
 *   variables: {
 *      streamSlug: // value for 'streamSlug'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreateLandingMutation(baseOptions?: Apollo.MutationHookOptions<CreateLandingMutation, CreateLandingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateLandingMutation, CreateLandingMutationVariables>(CreateLandingDocument, options);
      }
export type CreateLandingMutationHookResult = ReturnType<typeof useCreateLandingMutation>;
export type CreateLandingMutationResult = Apollo.MutationResult<CreateLandingMutation>;
export type CreateLandingMutationOptions = Apollo.BaseMutationOptions<CreateLandingMutation, CreateLandingMutationVariables>;