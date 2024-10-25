import { gql } from '@/__generated__'

export const CHANGE_CAMPAIGN_ACTIVE = gql(/* GraphQL */ `
  mutation ChangeCampaignActive($campaignSlug: Int!, $active: Boolean!) {
    updateCampaign(cmp: { id: $campaignSlug, active: $active }) {
      id
      active
    }
  }
`)
