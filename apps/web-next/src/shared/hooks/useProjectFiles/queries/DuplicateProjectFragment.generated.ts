import * as Types from '../../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DuplicateProjectFragmentMutationVariables = Types.Exact<{
  projectSlug: Types.Scalars['Int']['input'];
  id: Types.Scalars['Int']['input'];
  parentId: Types.Scalars['Int']['input'];
  name?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type DuplicateProjectFragmentMutation = { __typename?: 'Mutation', cloneFragment: { __typename?: 'FragmentGet', id: number, name: string, directoryId: number } };


export const DuplicateProjectFragmentDocument = gql`
    mutation DuplicateProjectFragment($projectSlug: Int!, $id: Int!, $parentId: Int!, $name: String) {
  cloneFragment(
    clone: {projectId: $projectSlug, directoryId: $parentId, fragmentId: $id, name: $name}
  ) {
    id
    name
    directoryId
  }
}
    `;
export type DuplicateProjectFragmentMutationFn = Apollo.MutationFunction<DuplicateProjectFragmentMutation, DuplicateProjectFragmentMutationVariables>;

/**
 * __useDuplicateProjectFragmentMutation__
 *
 * To run a mutation, you first call `useDuplicateProjectFragmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDuplicateProjectFragmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [duplicateProjectFragmentMutation, { data, loading, error }] = useDuplicateProjectFragmentMutation({
 *   variables: {
 *      projectSlug: // value for 'projectSlug'
 *      id: // value for 'id'
 *      parentId: // value for 'parentId'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useDuplicateProjectFragmentMutation(baseOptions?: Apollo.MutationHookOptions<DuplicateProjectFragmentMutation, DuplicateProjectFragmentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DuplicateProjectFragmentMutation, DuplicateProjectFragmentMutationVariables>(DuplicateProjectFragmentDocument, options);
      }
export type DuplicateProjectFragmentMutationHookResult = ReturnType<typeof useDuplicateProjectFragmentMutation>;
export type DuplicateProjectFragmentMutationResult = Apollo.MutationResult<DuplicateProjectFragmentMutation>;
export type DuplicateProjectFragmentMutationOptions = Apollo.BaseMutationOptions<DuplicateProjectFragmentMutation, DuplicateProjectFragmentMutationVariables>;