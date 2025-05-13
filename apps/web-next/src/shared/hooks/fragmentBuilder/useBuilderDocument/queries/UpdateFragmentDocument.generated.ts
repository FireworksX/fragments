import * as Types from '../../../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateFragmentDocumentMutationVariables = Types.Exact<{
  fragmentSlug: Types.Scalars['Int']['input'];
  name?: Types.InputMaybe<Types.Scalars['String']['input']>;
  document?: Types.InputMaybe<Types.Scalars['JSON']['input']>;
  linkedFragments?: Types.InputMaybe<Array<Types.Scalars['Int']['input']> | Types.Scalars['Int']['input']>;
}>;


export type UpdateFragmentDocumentMutation = { __typename?: 'Mutation', updateFragment: { __typename?: 'FragmentGet', id: number, name: string, document: any } };


export const UpdateFragmentDocumentDocument = gql`
    mutation UpdateFragmentDocument($fragmentSlug: Int!, $name: String, $document: JSON, $linkedFragments: [Int!]) {
  updateFragment(
    fg: {id: $fragmentSlug, name: $name, document: $document, linkedFragments: $linkedFragments}
  ) {
    id
    name
    document
  }
}
    `;
export type UpdateFragmentDocumentMutationFn = Apollo.MutationFunction<UpdateFragmentDocumentMutation, UpdateFragmentDocumentMutationVariables>;

/**
 * __useUpdateFragmentDocumentMutation__
 *
 * To run a mutation, you first call `useUpdateFragmentDocumentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateFragmentDocumentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateFragmentDocumentMutation, { data, loading, error }] = useUpdateFragmentDocumentMutation({
 *   variables: {
 *      fragmentSlug: // value for 'fragmentSlug'
 *      name: // value for 'name'
 *      document: // value for 'document'
 *      linkedFragments: // value for 'linkedFragments'
 *   },
 * });
 */
export function useUpdateFragmentDocumentMutation(baseOptions?: Apollo.MutationHookOptions<UpdateFragmentDocumentMutation, UpdateFragmentDocumentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateFragmentDocumentMutation, UpdateFragmentDocumentMutationVariables>(UpdateFragmentDocumentDocument, options);
      }
export type UpdateFragmentDocumentMutationHookResult = ReturnType<typeof useUpdateFragmentDocumentMutation>;
export type UpdateFragmentDocumentMutationResult = Apollo.MutationResult<UpdateFragmentDocumentMutation>;
export type UpdateFragmentDocumentMutationOptions = Apollo.BaseMutationOptions<UpdateFragmentDocumentMutation, UpdateFragmentDocumentMutationVariables>;