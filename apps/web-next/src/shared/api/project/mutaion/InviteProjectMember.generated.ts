import * as Types from '../../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type InviteProjectMemberMutationVariables = Types.Exact<{
  projectSlug: Types.Scalars['Int']['input'];
  email: Types.Scalars['String']['input'];
  role: Types.UserRole;
}>;


export type InviteProjectMemberMutation = { __typename?: 'Mutation', inviteUserToProject?: any | null };


export const InviteProjectMemberDocument = gql`
    mutation InviteProjectMember($projectSlug: Int!, $email: String!, $role: UserRole!) {
  inviteUserToProject(email: $email, projectId: $projectSlug, role: $role)
}
    `;
export type InviteProjectMemberMutationFn = Apollo.MutationFunction<InviteProjectMemberMutation, InviteProjectMemberMutationVariables>;

/**
 * __useInviteProjectMemberMutation__
 *
 * To run a mutation, you first call `useInviteProjectMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInviteProjectMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [inviteProjectMemberMutation, { data, loading, error }] = useInviteProjectMemberMutation({
 *   variables: {
 *      projectSlug: // value for 'projectSlug'
 *      email: // value for 'email'
 *      role: // value for 'role'
 *   },
 * });
 */
export function useInviteProjectMemberMutation(baseOptions?: Apollo.MutationHookOptions<InviteProjectMemberMutation, InviteProjectMemberMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InviteProjectMemberMutation, InviteProjectMemberMutationVariables>(InviteProjectMemberDocument, options);
      }
export type InviteProjectMemberMutationHookResult = ReturnType<typeof useInviteProjectMemberMutation>;
export type InviteProjectMemberMutationResult = Apollo.MutationResult<InviteProjectMemberMutation>;
export type InviteProjectMemberMutationOptions = Apollo.BaseMutationOptions<InviteProjectMemberMutation, InviteProjectMemberMutationVariables>;