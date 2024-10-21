import { gql } from '@/__generated__'

export const campaignsList = gql(/* GraphQL */ `
  query CampaignsList($projectId: Int!) {
    campaign(projectId: $projectId) {
      id
      name
      active
      description
    }
  }
`)
