import { gql } from '@/__generated__'

export const LIST_STREAMS = gql(/* GraphQL */ `
  query ListSteams($campaignSlug: Int!) {
    stream(campaignId: $campaignSlug) {
      id
      weight
      name
      active
    }
  }
`)
