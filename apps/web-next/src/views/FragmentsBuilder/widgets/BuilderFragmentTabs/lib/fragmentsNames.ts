import { gql } from '@/__generated__'

export const FRAGMENTS_NAMES = gql(/* GraphQL */ `
  query FragmentsNames($projectSlug: Int!, $fragmentIds: [Int!]) {
    fragment(projectId: $projectSlug, fragmentIds: $fragmentIds) {
      id
      name
    }
  }
`)
