import * as Types from '../../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FragmentTemplatesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type FragmentTemplatesQuery = { __typename?: 'Query', defaultTemplates: Array<{ __typename?: 'FragmentGet', id: number, name: string }> };


export const FragmentTemplatesDocument = gql`
    query FragmentTemplates {
  defaultTemplates {
    id
    name
  }
}
    `;

/**
 * __useFragmentTemplatesQuery__
 *
 * To run a query within a React component, call `useFragmentTemplatesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFragmentTemplatesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFragmentTemplatesQuery({
 *   variables: {
 *   },
 * });
 */
export function useFragmentTemplatesQuery(baseOptions?: Apollo.QueryHookOptions<FragmentTemplatesQuery, FragmentTemplatesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FragmentTemplatesQuery, FragmentTemplatesQueryVariables>(FragmentTemplatesDocument, options);
      }
export function useFragmentTemplatesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FragmentTemplatesQuery, FragmentTemplatesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FragmentTemplatesQuery, FragmentTemplatesQueryVariables>(FragmentTemplatesDocument, options);
        }
export function useFragmentTemplatesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FragmentTemplatesQuery, FragmentTemplatesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FragmentTemplatesQuery, FragmentTemplatesQueryVariables>(FragmentTemplatesDocument, options);
        }
export type FragmentTemplatesQueryHookResult = ReturnType<typeof useFragmentTemplatesQuery>;
export type FragmentTemplatesLazyQueryHookResult = ReturnType<typeof useFragmentTemplatesLazyQuery>;
export type FragmentTemplatesSuspenseQueryHookResult = ReturnType<typeof useFragmentTemplatesSuspenseQuery>;
export type FragmentTemplatesQueryResult = Apollo.QueryResult<FragmentTemplatesQuery, FragmentTemplatesQueryVariables>;