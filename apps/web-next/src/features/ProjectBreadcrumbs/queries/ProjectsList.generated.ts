import * as Types from '../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ProjectsListQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ProjectsListQuery = { __typename?: 'Query', project: Array<{ __typename?: 'ProjectGet', id: number, name: string, logo: { __typename?: 'MediaGet', url: string } }> };


export const ProjectsListDocument = gql`
    query ProjectsList {
  project {
    id
    name
    logo {
      url: publicPath
    }
  }
}
    `;

/**
 * __useProjectsListQuery__
 *
 * To run a query within a React component, call `useProjectsListQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectsListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectsListQuery({
 *   variables: {
 *   },
 * });
 */
export function useProjectsListQuery(baseOptions?: Apollo.QueryHookOptions<ProjectsListQuery, ProjectsListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectsListQuery, ProjectsListQueryVariables>(ProjectsListDocument, options);
      }
export function useProjectsListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectsListQuery, ProjectsListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectsListQuery, ProjectsListQueryVariables>(ProjectsListDocument, options);
        }
export function useProjectsListSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProjectsListQuery, ProjectsListQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProjectsListQuery, ProjectsListQueryVariables>(ProjectsListDocument, options);
        }
export type ProjectsListQueryHookResult = ReturnType<typeof useProjectsListQuery>;
export type ProjectsListLazyQueryHookResult = ReturnType<typeof useProjectsListLazyQuery>;
export type ProjectsListSuspenseQueryHookResult = ReturnType<typeof useProjectsListSuspenseQuery>;
export type ProjectsListQueryResult = Apollo.QueryResult<ProjectsListQuery, ProjectsListQueryVariables>;