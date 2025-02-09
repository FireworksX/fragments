import { gql } from '@/__generated__'

export const UPDATE_FRAGMENT_DOCUMENT = gql(/*GraphQL*/ `
    mutation UpdateFragmentDocument($fragmentSlug: Int!, $name: String, $document: JSON, $linkedFragments: [Int!]) {
        updateFragment(fg: {id: $fragmentSlug, name: $name, document: $document, linkedFragments: $linkedFragments}) {
            id
            name
            document
        }
    }
`)
