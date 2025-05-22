import * as Types from '../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateAreaMutationVariables = Types.Exact<{
  id: Types.Scalars['Int']['input'];
  name?: Types.InputMaybe<Types.Scalars['String']['input']>;
  description?: Types.InputMaybe<Types.Scalars['String']['input']>;
  code?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type UpdateAreaMutation = { __typename?: 'Mutation', updateArea: { __typename?: 'AreaGet', id: number, name: string, description?: string | null } };


export const UpdateAreaDocument = gql`
    mutation UpdateArea($id: Int!, $name: String, $description: String, $code: String) {
  updateArea(
    area: {id: $id, name: $name, description: $description, areaCode: $code}
  ) {
    id
    name
    description
  }
}
    `;
export type UpdateAreaMutationFn = Apollo.MutationFunction<UpdateAreaMutation, UpdateAreaMutationVariables>;

/**
 * __useUpdateAreaMutation__
 *
 * To run a mutation, you first call `useUpdateAreaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAreaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAreaMutation, { data, loading, error }] = useUpdateAreaMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      description: // value for 'description'
 *      code: // value for 'code'
 *   },
 * });
 */
export function useUpdateAreaMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAreaMutation, UpdateAreaMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateAreaMutation, UpdateAreaMutationVariables>(UpdateAreaDocument, options);
      }
export type UpdateAreaMutationHookResult = ReturnType<typeof useUpdateAreaMutation>;
export type UpdateAreaMutationResult = Apollo.MutationResult<UpdateAreaMutation>;
export type UpdateAreaMutationOptions = Apollo.BaseMutationOptions<UpdateAreaMutation, UpdateAreaMutationVariables>;