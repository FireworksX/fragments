import { createState, LinkKey } from "@graph-state/core";
import { isHtmlContent, isHTMLNode } from "@graph-state/checkers";

export const createManager = (fragmentKey: LinkKey, initialDocument = {}) => {
  const manager = createState({
    _type: "FragmentManager",
    initialState: initialDocument,
    plugins: [
      (state) => {
        state.$fragment = {
          root: fragmentKey,
        };
      },
    ],
    skip: [isHtmlContent, isHTMLNode],
  });

  return manager;
};
