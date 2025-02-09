import { gql } from '@/__generated__'

export const FRAGMENT_DOCUMENT = gql(/*GraphQL*/ `
query FragmentDocument($fragmentSlug: Int!) {
    fragment(fragmentIds: [$fragmentSlug]) {
        id
        name
        document
        linkedFragments {
            id
            document
        }
    }
}
`)
