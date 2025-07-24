import * as Types from '../../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AddProjectOriginMutationVariables = Types.Exact<{
  projectSlug: Types.Scalars['Int']['input'];
  origin: Types.Scalars['String']['input'];
}>;


export type AddProjectOriginMutation = { __typename?: 'Mutation', addProjectAllowedOrigin: { __typename?: 'ProjectGet', id: number, allowedOrigins: Array<{ __typename?: 'ProjectAllowedOriginGet', id: number, origin: string }> } };


export const AddProjectOriginDocument = gql`
    mutation AddProjectOrigin($projectSlug: Int!, $origin: String!) {
  addProjectAllowedOrigin(
    name: "Origin"
    origin: $origin
    projectId: $projectSlug
  ) {
    id
    allowedOrigins {
      id
      origin
    }
  }
}
    `;
export type AddProjectOriginMutationFn = Apollo.MutationFunction<AddProjectOriginMutation, AddProjectOriginMutationVariables>;

/**
 * __useAddProjectOriginMutation__
 *
 * To run a mutation, you first call `useAddProjectOriginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddProjectOriginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addProjectOriginMutation, { data, loading, error }] = useAddProjectOriginMutation({
 *   variables: {
 *      projectSlug: // value for 'projectSlug'
 *      origin: // value for 'origin'
 *   },
 * });
 */
export function useAddProjectOriginMutation(baseOptions?: Apollo.MutationHookOptions<AddProjectOriginMutation, AddProjectOriginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddProjectOriginMutation, AddProjectOriginMutationVariables>(AddProjectOriginDocument, options);
      }
export type AddProjectOriginMutationHookResult = ReturnType<typeof useAddProjectOriginMutation>;
export type AddProjectOriginMutationResult = Apollo.MutationResult<AddProjectOriginMutation>;
export type AddProjectOriginMutationOptions = Apollo.BaseMutationOptions<AddProjectOriginMutation, AddProjectOriginMutationVariables>;