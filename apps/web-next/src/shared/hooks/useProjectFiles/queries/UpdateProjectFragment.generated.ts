import * as Types from '../../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateProjectFragmentMutationVariables = Types.Exact<{
  fragmentId: Types.Scalars['Int']['input'];
  name?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type UpdateProjectFragmentMutation = { __typename?: 'Mutation', updateFragment: { __typename?: 'FragmentGet', id: number, name: string } };


export const UpdateProjectFragmentDocument = gql`
    mutation UpdateProjectFragment($fragmentId: Int!, $name: String) {
  updateFragment(fg: {id: $fragmentId, name: $name}) {
    id
    name
  }
}
    `;
export type UpdateProjectFragmentMutationFn = Apollo.MutationFunction<UpdateProjectFragmentMutation, UpdateProjectFragmentMutationVariables>;

/**
 * __useUpdateProjectFragmentMutation__
 *
 * To run a mutation, you first call `useUpdateProjectFragmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProjectFragmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProjectFragmentMutation, { data, loading, error }] = useUpdateProjectFragmentMutation({
 *   variables: {
 *      fragmentId: // value for 'fragmentId'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useUpdateProjectFragmentMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProjectFragmentMutation, UpdateProjectFragmentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProjectFragmentMutation, UpdateProjectFragmentMutationVariables>(UpdateProjectFragmentDocument, options);
      }
export type UpdateProjectFragmentMutationHookResult = ReturnType<typeof useUpdateProjectFragmentMutation>;
export type UpdateProjectFragmentMutationResult = Apollo.MutationResult<UpdateProjectFragmentMutation>;
export type UpdateProjectFragmentMutationOptions = Apollo.BaseMutationOptions<UpdateProjectFragmentMutation, UpdateProjectFragmentMutationVariables>;