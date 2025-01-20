import { gql } from '@/__generated__'

export const CREATE_LANDING = gql(/* GraphQL */ `
  #  mutation CreateLanding($streamSlug: Int!, $name: String!, $weight: Float!) {
  ##    createStreamFragment(streamFragment: { streamId: $streamSlug, fragmentId: 1, name: $name, weight: $weight }) {
  ##      id
  ##      name
  ##      props
  ##      weight
  ##      props
  ##    }
  #  }
`)
