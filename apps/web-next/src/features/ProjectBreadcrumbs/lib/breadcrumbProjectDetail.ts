import { gql } from '@/__generated__'

export const BREADCRUMB_PROJECT_DETAIL = gql(/* GraphQL */ `
  query ProjectBreadcrumb($projectId: Int!) {
    project(projectId: $projectId) {
      name
    }
  }
`)
