import * as Types from '../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AuthSignInMutationVariables = Types.Exact<{
  email: Types.Scalars['String']['input'];
  password: Types.Scalars['String']['input'];
}>;


export type AuthSignInMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthPayload', accessToken: string, refreshToken: string, user: { __typename?: 'UserGet', id: number, email: string, firstName: string, lastName?: string | null } } };


export const AuthSignInDocument = gql`
    mutation AuthSignIn($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    user {
      id
      email
      firstName
      lastName
    }
    accessToken
    refreshToken
  }
}
    `;
export type AuthSignInMutationFn = Apollo.MutationFunction<AuthSignInMutation, AuthSignInMutationVariables>;

/**
 * __useAuthSignInMutation__
 *
 * To run a mutation, you first call `useAuthSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuthSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authSignInMutation, { data, loading, error }] = useAuthSignInMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useAuthSignInMutation(baseOptions?: Apollo.MutationHookOptions<AuthSignInMutation, AuthSignInMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AuthSignInMutation, AuthSignInMutationVariables>(AuthSignInDocument, options);
      }
export type AuthSignInMutationHookResult = ReturnType<typeof useAuthSignInMutation>;
export type AuthSignInMutationResult = Apollo.MutationResult<AuthSignInMutation>;
export type AuthSignInMutationOptions = Apollo.BaseMutationOptions<AuthSignInMutation, AuthSignInMutationVariables>;