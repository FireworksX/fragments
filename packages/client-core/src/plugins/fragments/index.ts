import { createState, LinkKey, Plugin } from "@graph-state/core";
import {
  isGraph,
  isHtmlContent,
  isHTMLNode,
  isLinkKey,
  allowTypes,
} from "@graph-state/checkers";
import { definition } from "@fragmentsx/definition";
import { isBrowser, isKey } from "@fragmentsx/utils";
import { fragmentStylesheetPlugin } from "@/plugins/styleSheet";
import { autoInjector } from "@/plugins/styleSheet/utils/autoInjector";
import { PLUGIN_TYPES } from "@/fragmentsClient";

declare module "@graph-state/core" {
  interface GraphState {
    $fragments: {
      key: LinkKey;
      createFragmentManager: (
        fragmentId: number,
        initialDocument?: unknown
      ) => void;
      getManager: (fragmentId: number) => GraphState;
      getManagers: () => Record<number, GraphState>;
    };
  }
}

export const fragmentsPlugin: Plugin = (state) => {
  const createFragmentManager = (fragmentId: number, initialDocument = {}) => {
    if (!fragmentId || !initialDocument) return null;

    console.log(fragmentId, initialDocument);
    const fragmentLayerId =
      initialDocument?._type === definition.nodes.Fragment
        ? initialDocument?._id
        : null;

    if (!fragmentLayerId) {
      console.error("Cannot find fragment layer id");
      return;
    }

    const cacheManager = state.resolve(state.$fragments.key)?.managers?.[
      fragmentId
    ];

    if (cacheManager) {
      return cacheManager;
    }

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
            root: `${definition.nodes.Fragment}:${fragmentLayerId}`,
            temp: "Temp:root",
          };
        },
        // cssPlugin,
        fragmentStylesheetPlugin,
      ],
      skip: [
        isHtmlContent,
        isHTMLNode,
        isKey,
        allowTypes([
          ...Object.keys(definition.nodes),
          "Temp",
          "Spring",
          PLUGIN_TYPES.FragmentStylesheet,
        ]),
      ],
    });

    manager.mutate(tempGraph);
    manager.mutate(springGraph);

    state.mutate(state.$fragments.key, {
      managers: {
        [fragmentId]: manager,
      },
    });
  };

  const getManager = (fragmentId) => {
    return state.resolve(state.$fragments.key)?.managers?.[fragmentId];
  };

  const getManagers = () => {
    return state.resolve(state.$fragments.key)?.managers;
  };

  state.$fragments = {
    key: `${PLUGIN_TYPES.FragmentsPlugin}:root`,
    createFragmentManager,
    getManager,
    getManagers,
  };

  state.mutate({
    _type: PLUGIN_TYPES.FragmentsPlugin,
    _id: "root",
    managers: {},
  });

  return state;
};
