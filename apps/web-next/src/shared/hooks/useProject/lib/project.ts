import { gql } from '@/__generated__'

export const PROJECT = gql(/* GraphQL */ `
  query Project($projectSlug: Int!) {
    project(projectId: $projectSlug) {
      id
      name
    }
  }
`)
