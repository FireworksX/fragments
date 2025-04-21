import { createState, LinkKey } from "@graph-state/core";
import { isHtmlContent, isHTMLNode } from "@graph-state/checkers";
import { definition } from "@fragmentsx/definition";
import { isKey } from "@/shared/helpers/keys";
import { cssPlugin } from "@/managers/cssPlugin";

export const createFragmentManager = (
  fragmentId: string,
  initialDocument = {}
) => {
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
    _id: fragmentId,
    initialState: initialDocument,
    plugins: [
      (state) => {
        state.$fragment = {
          root: `${definition.nodes.Fragment}:${fragmentId}`,
          temp: "Temp:root",
        };
      },
      cssPlugin,
    ],
    skip: [isHtmlContent, isHTMLNode, isKey],
  });

  manager.mutate(tempGraph);
  manager.mutate(springGraph);

  return manager;
};
