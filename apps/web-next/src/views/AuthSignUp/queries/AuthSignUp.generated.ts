import * as Types from '../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AuthSignUpMutationVariables = Types.Exact<{
  email: Types.Scalars['String']['input'];
  password: Types.Scalars['String']['input'];
  firstName: Types.Scalars['String']['input'];
  lastName?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type AuthSignUpMutation = { __typename?: 'Mutation', signup: { __typename?: 'AuthPayload', accessToken: string, refreshToken: string } };


export const AuthSignUpDocument = gql`
    mutation AuthSignUp($email: String!, $password: String!, $firstName: String!, $lastName: String) {
  signup(
    userSignUp: {lastName: $lastName, firstName: $firstName, email: $email, password: $password}
  ) {
    accessToken
    refreshToken
  }
}
    `;
export type AuthSignUpMutationFn = Apollo.MutationFunction<AuthSignUpMutation, AuthSignUpMutationVariables>;

/**
 * __useAuthSignUpMutation__
 *
 * To run a mutation, you first call `useAuthSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuthSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authSignUpMutation, { data, loading, error }] = useAuthSignUpMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *   },
 * });
 */
export function useAuthSignUpMutation(baseOptions?: Apollo.MutationHookOptions<AuthSignUpMutation, AuthSignUpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AuthSignUpMutation, AuthSignUpMutationVariables>(AuthSignUpDocument, options);
      }
export type AuthSignUpMutationHookResult = ReturnType<typeof useAuthSignUpMutation>;
export type AuthSignUpMutationResult = Apollo.MutationResult<AuthSignUpMutation>;
export type AuthSignUpMutationOptions = Apollo.BaseMutationOptions<AuthSignUpMutation, AuthSignUpMutationVariables>;