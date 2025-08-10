import * as Types from '../../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ProjectMembersQueryVariables = Types.Exact<{
  projectId?: Types.InputMaybe<Types.Scalars['Int']['input']>;
}>;


export type ProjectMembersQuery = { __typename?: 'Query', project: Array<{ __typename?: 'ProjectGet', members: Array<{ __typename?: 'UserRoleGet', id: number, firstName: string, lastName?: string | null, email: string, role: Types.UserRole, logo: { __typename?: 'MediaGet', publicPath: string } }> }> };


export const ProjectMembersDocument = gql`
    query ProjectMembers($projectId: Int) {
  project(projectId: $projectId) {
    members {
      id
      logo {
        publicPath
      }
      firstName
      lastName
      email
      role
    }
  }
}
    `;

/**
 * __useProjectMembersQuery__
 *
 * To run a query within a React component, call `useProjectMembersQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectMembersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectMembersQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useProjectMembersQuery(baseOptions?: Apollo.QueryHookOptions<ProjectMembersQuery, ProjectMembersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectMembersQuery, ProjectMembersQueryVariables>(ProjectMembersDocument, options);
      }
export function useProjectMembersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectMembersQuery, ProjectMembersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectMembersQuery, ProjectMembersQueryVariables>(ProjectMembersDocument, options);
        }
export function useProjectMembersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProjectMembersQuery, ProjectMembersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProjectMembersQuery, ProjectMembersQueryVariables>(ProjectMembersDocument, options);
        }
export type ProjectMembersQueryHookResult = ReturnType<typeof useProjectMembersQuery>;
export type ProjectMembersLazyQueryHookResult = ReturnType<typeof useProjectMembersLazyQuery>;
export type ProjectMembersSuspenseQueryHookResult = ReturnType<typeof useProjectMembersSuspenseQuery>;
export type ProjectMembersQueryResult = Apollo.QueryResult<ProjectMembersQuery, ProjectMembersQueryVariables>;