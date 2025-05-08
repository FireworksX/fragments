export const getLandingQuery = () =>
  `
query {
  clientLanding {
    id
    name
    stream {
      id
      name
      campaignId
    }
    weight
    fragment {
      id
      document
    }
  }
}
`;
