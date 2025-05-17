import { gql } from '@/__generated__'

export const CREATE_CAMPAIGN = gql(/* GraphQL */ `
  mutation CreateCampaign($name: String!, $description: String, $projectId: Int!) {
    createCampaign(
      cmp: { name: $name, description: $description, active: false, deleted: false, projectId: $projectId }
    ) {
      active
      name
      description
    }
  }
`)
