import { gql } from '@/__generated__'

export const PROJECTS_LIST = gql(/* GraphQL */ `
  query ProjectsList {
    project {
      id
      name
    }
  }
`)
