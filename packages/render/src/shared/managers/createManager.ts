import { createState, LinkKey } from "@graph-state/core";
import { isHtmlContent, isHTMLNode } from "@graph-state/checkers";

export const createManager = (fragmentKey: LinkKey, initialDocument = {}) => {
  const tempGraph = {
    _type: "Temp",
    _id: "root",
  };

  const springGraph = {
    _type: "Spring",
    _id: "root",
  };

  const manager = createState({
    _type: "FragmentManager",
    initialState: initialDocument,
    plugins: [
      (state) => {
        state.$fragment = {
          root: fragmentKey,
          temp: "Temp:root",
        };
      },
    ],
    skip: [isHtmlContent, isHTMLNode],
  });

  manager.mutate(tempGraph);
  manager.mutate(springGraph);

  return manager;
};
