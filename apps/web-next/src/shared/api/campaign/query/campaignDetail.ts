import { gql } from '@/__generated__'

export const CAMPAIGN_DETAIL = gql(/* GraphQL */ `
  query CampaignDetail($campaignSlug: Int!) {
    campaign(campgainId: $campaignSlug) {
      id
      name
      description
      active
      author {
        firstName
        lastName
      }
    }
  }
`)
