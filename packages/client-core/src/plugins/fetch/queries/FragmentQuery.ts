export const getFragmentQuery = (isSelf?: boolean) =>
  isSelf
    ? `
query FragmentDocument($fragmentSlug: Int!) {
    fragment(fragmentIds: [$fragmentSlug]) {
        id
        document
        linkedFragments {
            id
            document
        }
    }
}
`
    : `
query FragmentDocument($fragmentSlug: Int!) {
    clientFragment(fragmentId: $fragmentSlug) {
        id
        document
        linkedFragments {
            id
            document
        }
    }
}
`;
