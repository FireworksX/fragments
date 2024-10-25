import { gql } from '@/__generated__'

export const STREAM_DETAIL = gql(/* GraphQL */ `
  query StreamDetail($streamSlug: Int!) {
    stream(streamId: $streamSlug) {
      id
      name
      active
      weight
    }
  }
`)
