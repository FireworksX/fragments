import { gql } from '@/__generated__'

export const CHANGE_STREAM_ACTIVE = gql(/* GraphQL */ `
  mutation ChangeStreamActive($streamSlug: Int!, $campaignSlug: Int!, $active: Boolean!) {
    updateStream(strm: { id: $streamSlug, campaignId: $campaignSlug, active: $active }) {
      id
      active
    }
  }
`)
