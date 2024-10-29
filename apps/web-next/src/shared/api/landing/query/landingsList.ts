import { gql } from '@/__generated__'

export const LANDINGS_LIST = gql(/* GraphQL */ `
  query LandingsList($streamSlug: Int!) {
    streamFragment(streamId: $streamSlug) {
      id
      name
      props
      weight
    }
  }
`)
