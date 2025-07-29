export interface AreaQueryReturn {
  clientArea: {
    variant: {
      fragment: {
        props: Record<string, unknown>;
        fragment: {
          id: number;
          document: string;
          linkedFragments: {
            id: number;
            document: string;
          };
        };
      };
    };
  };
}

export const getAreaQuery = (areaCode: string) => {
  return {
    query: `query($areaCode: String!) {
  clientArea(areaCode: $areaCode) {
        variant {
          fragment {
              props
              fragment {
                  id
                  document
                  linkedFragments {
                      id
                      document
                  }
              }
          }
        }
    }
}`,
    variables: {
      areaCode,
    },
  };
};
