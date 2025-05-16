import * as Types from '../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateProjectInfoMutationVariables = Types.Exact<{
  projectSlug: Types.Scalars['Int']['input'];
  name?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type UpdateProjectInfoMutation = { __typename?: 'Mutation', updateProject: { __typename?: 'ProjectGet', id: number, name: string } };


export const UpdateProjectInfoDocument = gql`
    mutation UpdateProjectInfo($projectSlug: Int!, $name: String) {
  updateProject(pr: {id: $projectSlug, name: $name}) {
    id
    name
  }
}
    `;
export type UpdateProjectInfoMutationFn = Apollo.MutationFunction<UpdateProjectInfoMutation, UpdateProjectInfoMutationVariables>;

/**
 * __useUpdateProjectInfoMutation__
 *
 * To run a mutation, you first call `useUpdateProjectInfoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProjectInfoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProjectInfoMutation, { data, loading, error }] = useUpdateProjectInfoMutation({
 *   variables: {
 *      projectSlug: // value for 'projectSlug'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useUpdateProjectInfoMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProjectInfoMutation, UpdateProjectInfoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProjectInfoMutation, UpdateProjectInfoMutationVariables>(UpdateProjectInfoDocument, options);
      }
export type UpdateProjectInfoMutationHookResult = ReturnType<typeof useUpdateProjectInfoMutation>;
export type UpdateProjectInfoMutationResult = Apollo.MutationResult<UpdateProjectInfoMutation>;
export type UpdateProjectInfoMutationOptions = Apollo.BaseMutationOptions<UpdateProjectInfoMutation, UpdateProjectInfoMutationVariables>;