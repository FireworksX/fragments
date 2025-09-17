import * as Types from '../../../__generated__/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AreaAnalyticsQueryVariables = Types.Exact<{
  areaId: Types.Scalars['Int']['input'];
  fromTs: Types.Scalars['DateTime']['input'];
  toTs: Types.Scalars['DateTime']['input'];
}>;


export type AreaAnalyticsQuery = { __typename?: 'Query', areaStatisticRating: Array<{ __typename?: 'AreaStatisticRatingGet', areaId: number, areaCode: string, currentPeriod: { __typename?: 'PeriodAnalytics', pages: Array<{ __typename?: 'PageAnalytic', percentage: number, label: string, value: number }>, osTypes: Array<{ __typename?: 'OSTypeAnalytic', percentage: number, label: string, value: number }>, deviceTypes: Array<{ __typename?: 'DeviceTypeAnalytic', percentage: number, label: string, value: number }>, countries: Array<{ __typename?: 'CountryAnalytic', iso: string, percentage: number, label: string, value: number }>, browsers: Array<{ __typename?: 'BrowserAnalytic', percentage: number, label: string, value: number }> } }> };


export const AreaAnalyticsDocument = gql`
    query AreaAnalytics($areaId: Int!, $fromTs: DateTime!, $toTs: DateTime!) {
  areaStatisticRating(
    statisticRatingFilter: {fromTs: $fromTs, toTs: $toTs, dataIds: [$areaId]}
  ) {
    areaId
    areaCode
    currentPeriod {
      pages {
        label: page
        value: views
        percentage
      }
      osTypes {
        label: name
        value: views
        percentage
      }
      deviceTypes {
        label: name
        value: views
        percentage
      }
      countries {
        iso
        label: name
        value: views
        percentage
      }
      browsers {
        label: name
        value: views
        percentage
      }
    }
  }
}
    `;

/**
 * __useAreaAnalyticsQuery__
 *
 * To run a query within a React component, call `useAreaAnalyticsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAreaAnalyticsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAreaAnalyticsQuery({
 *   variables: {
 *      areaId: // value for 'areaId'
 *      fromTs: // value for 'fromTs'
 *      toTs: // value for 'toTs'
 *   },
 * });
 */
export function useAreaAnalyticsQuery(baseOptions: Apollo.QueryHookOptions<AreaAnalyticsQuery, AreaAnalyticsQueryVariables> & ({ variables: AreaAnalyticsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AreaAnalyticsQuery, AreaAnalyticsQueryVariables>(AreaAnalyticsDocument, options);
      }
export function useAreaAnalyticsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AreaAnalyticsQuery, AreaAnalyticsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AreaAnalyticsQuery, AreaAnalyticsQueryVariables>(AreaAnalyticsDocument, options);
        }
export function useAreaAnalyticsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<AreaAnalyticsQuery, AreaAnalyticsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AreaAnalyticsQuery, AreaAnalyticsQueryVariables>(AreaAnalyticsDocument, options);
        }
export type AreaAnalyticsQueryHookResult = ReturnType<typeof useAreaAnalyticsQuery>;
export type AreaAnalyticsLazyQueryHookResult = ReturnType<typeof useAreaAnalyticsLazyQuery>;
export type AreaAnalyticsSuspenseQueryHookResult = ReturnType<typeof useAreaAnalyticsSuspenseQuery>;
export type AreaAnalyticsQueryResult = Apollo.QueryResult<AreaAnalyticsQuery, AreaAnalyticsQueryVariables>;