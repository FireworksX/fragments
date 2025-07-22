export interface QueryReturnSelf {
  fragment: {
    id: number;
    document: string;
    linkedFragments: {
      id: number;
      document: string;
    };
  }[];
}

export interface QueryReturnNotSelf {
  clientFragment: {
    id: number;
    document: string;
    linkedFragments: {
      id: number;
      document: string;
    };
  };
}

export const getFragmentQuery = <TIsSelf extends boolean>(
  fragmentId: number,
  isSelf?: TIsSelf
) => {
  return {
    query: isSelf
      ? `
query FragmentDocument($fragmentId: Int!) {
    fragment(fragmentIds: [$fragmentId]) {
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
query FragmentDocument($fragmentId: Int!) {
    clientFragment(fragmentId: $fragmentId) {
        id
        document
        linkedFragments {
            id
            document
        }
    }
}`,
    variables: {
      fragmentId,
    },
    _type: null as any as TIsSelf extends true
      ? QueryReturnSelf
      : QueryReturnNotSelf,
  };
};
