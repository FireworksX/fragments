import { createState, GraphState, LinkKey } from "@graph-state/core";
import { isHtmlContent, isHTMLNode } from "@graph-state/checkers";
import { definition } from "@fragmentsx/definition";
import { isKey } from "@/shared/helpers/keys";
import { cssPlugin } from "@/managers/cssPlugin";
import { styleSheetPlugin } from "@/managers/styleSheetPlugin";

export const createFragmentManager =
  (globalManager: GraphState) =>
  (fragmentId: string, initialDocument = {}) => {
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
        styleSheetPlugin,
      ],
      skip: [isHtmlContent, isHTMLNode, isKey],
    });

    manager.mutate(tempGraph);
    manager.mutate(springGraph);

    return manager;
  };
