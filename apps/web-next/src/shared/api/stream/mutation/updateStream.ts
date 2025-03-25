import { gql } from '@/__generated__'

export const UPDATE_STREAM = gql(/* GraphQL */ `
  mutation UpdateStream($streamSlug: Int!, $campaignSlug: Int!, $name: String, $active: Boolean) {
    updateStream(strm: { id: $streamSlug, campaignId: $campaignSlug, active: $active, name: $name }) {
      id
      active
      name
    }
  }
`)
