import * as Types from '../../../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FragmentsNamesQueryVariables = Types.Exact<{
  projectSlug: Types.Scalars['Int']['input'];
  fragmentIds?: Types.InputMaybe<Array<Types.Scalars['Int']['input']> | Types.Scalars['Int']['input']>;
}>;


export type FragmentsNamesQuery = { __typename?: 'Query', fragment: Array<{ __typename?: 'FragmentGet', id: number, name: string }> };


export const FragmentsNamesDocument = gql`
    query FragmentsNames($projectSlug: Int!, $fragmentIds: [Int!]) {
  fragment(projectId: $projectSlug, fragmentIds: $fragmentIds) {
    id
    name
  }
}
    `;

/**
 * __useFragmentsNamesQuery__
 *
 * To run a query within a React component, call `useFragmentsNamesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFragmentsNamesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFragmentsNamesQuery({
 *   variables: {
 *      projectSlug: // value for 'projectSlug'
 *      fragmentIds: // value for 'fragmentIds'
 *   },
 * });
 */
export function useFragmentsNamesQuery(baseOptions: Apollo.QueryHookOptions<FragmentsNamesQuery, FragmentsNamesQueryVariables> & ({ variables: FragmentsNamesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FragmentsNamesQuery, FragmentsNamesQueryVariables>(FragmentsNamesDocument, options);
      }
export function useFragmentsNamesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FragmentsNamesQuery, FragmentsNamesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FragmentsNamesQuery, FragmentsNamesQueryVariables>(FragmentsNamesDocument, options);
        }
export function useFragmentsNamesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FragmentsNamesQuery, FragmentsNamesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FragmentsNamesQuery, FragmentsNamesQueryVariables>(FragmentsNamesDocument, options);
        }
export type FragmentsNamesQueryHookResult = ReturnType<typeof useFragmentsNamesQuery>;
export type FragmentsNamesLazyQueryHookResult = ReturnType<typeof useFragmentsNamesLazyQuery>;
export type FragmentsNamesSuspenseQueryHookResult = ReturnType<typeof useFragmentsNamesSuspenseQuery>;
export type FragmentsNamesQueryResult = Apollo.QueryResult<FragmentsNamesQuery, FragmentsNamesQueryVariables>;