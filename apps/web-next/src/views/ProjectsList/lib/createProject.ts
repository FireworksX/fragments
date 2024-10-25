import { gql } from '@/__generated__'

export const CREATE_PROJECT = gql(/* GraphQL */ `
  mutation CreateProject($name: String!) {
    createProject(pr: { name: $name }) {
      name
      owner {
        firstName
        lastName
      }
    }
  }
`)
