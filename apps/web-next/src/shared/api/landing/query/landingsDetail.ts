import { gql } from '@/__generated__'

export const LANDING_DETAIL = gql(/* GraphQL */ `
  #  query LandingsDetail($landingSlug: Int!) {
  #    streamFragment(streamFragmentId: $landingSlug) {
  #      id
  #      name
  #      props
  #      weight
  #    }
  #  }
`)
