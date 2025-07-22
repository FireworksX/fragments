import * as Types from '../../../__generated__/types';

import { gql } from '@apollo/client';
export type ReleaseConditionFragment = { __typename?: 'ReleaseConditionGet', id: number, name: string, conditionSets: Array<{ __typename?: 'ConditionSetGet', id: number, name: string, conditions: Array<{ __typename?: 'ConditionGet', id: number, name: string, filterData?: { __typename?: 'FilterDeviceTypeGet', deviceTypes: Array<Types.DeviceType> } | { __typename?: 'FilterGeoLocationsGet', geoLocations: Array<{ __typename?: 'FilterGeoLocationGet', country: string, region?: string | null, city?: string | null }> } | { __typename?: 'FilterOSTypeGet', osTypes: Array<Types.OsType> } | { __typename?: 'FilterPageGet', pages: Array<string> } | { __typename?: 'FilterTimeFramesGet', timeFrames: Array<{ __typename?: 'FilterTimeFrameGet', fromTime: any, toTime: any }> } | null }> }> };

export const ReleaseConditionFragmentDoc = gql`
    fragment ReleaseCondition on ReleaseConditionGet {
  id
  name
  conditionSets {
    id
    name
    conditions {
      id
      name
      filterData {
        ... on FilterDeviceTypeGet {
          deviceTypes
        }
        ... on FilterOSTypeGet {
          osTypes
        }
        ... on FilterTimeFramesGet {
          timeFrames {
            fromTime
            toTime
          }
        }
        ... on FilterPageGet {
          pages
        }
        ... on FilterGeoLocationsGet {
          geoLocations {
            country
            region
            city
          }
        }
      }
    }
  }
}
    `;