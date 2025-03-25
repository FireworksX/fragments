import * as Types from '../../../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FragmentDocumentQueryVariables = Types.Exact<{
  fragmentSlug: Types.Scalars['Int']['input'];
}>;


export type FragmentDocumentQuery = { __typename?: 'Query', fragment: Array<{ __typename?: 'FragmentGet', id: number, name: string, document: any, linkedFragments?: Array<{ __typename?: 'FragmentGet', id: number, document: any }> | null }> };


export const FragmentDocumentDocument = gql`
    query FragmentDocument($fragmentSlug: Int!) {
  fragment(fragmentIds: [$fragmentSlug]) {
    id
    name
    document
    linkedFragments {
      id
      document
    }
  }
}
    `;

/**
 * __useFragmentDocumentQuery__
 *
 * To run a query within a React component, call `useFragmentDocumentQuery` and pass it any options that fit your needs.
 * When your component renders, `useFragmentDocumentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFragmentDocumentQuery({
 *   variables: {
 *      fragmentSlug: // value for 'fragmentSlug'
 *   },
 * });
 */
export function useFragmentDocumentQuery(baseOptions: Apollo.QueryHookOptions<FragmentDocumentQuery, FragmentDocumentQueryVariables> & ({ variables: FragmentDocumentQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FragmentDocumentQuery, FragmentDocumentQueryVariables>(FragmentDocumentDocument, options);
      }
export function useFragmentDocumentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FragmentDocumentQuery, FragmentDocumentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FragmentDocumentQuery, FragmentDocumentQueryVariables>(FragmentDocumentDocument, options);
        }
export function useFragmentDocumentSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FragmentDocumentQuery, FragmentDocumentQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FragmentDocumentQuery, FragmentDocumentQueryVariables>(FragmentDocumentDocument, options);
        }
export type FragmentDocumentQueryHookResult = ReturnType<typeof useFragmentDocumentQuery>;
export type FragmentDocumentLazyQueryHookResult = ReturnType<typeof useFragmentDocumentLazyQuery>;
export type FragmentDocumentSuspenseQueryHookResult = ReturnType<typeof useFragmentDocumentSuspenseQuery>;
export type FragmentDocumentQueryResult = Apollo.QueryResult<FragmentDocumentQuery, FragmentDocumentQueryVariables>;