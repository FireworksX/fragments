export const FragmentQuery = `
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
`;
