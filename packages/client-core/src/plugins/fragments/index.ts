import { createState, Plugin } from "@graph-state/core";
import {
  isGraph,
  isHtmlContent,
  isHTMLNode,
  isLinkKey,
} from "@graph-state/checkers";
import { definition } from "@fragmentsx/definition";
import { isKey } from "@fragmentsx/utils";
import { styleSheetPlugin } from "@/plugins/styleSheet";

export const allowTypes = (types: string[]) => (input: unknown) => {
  if (!input) return false;
  let type: string | null = null;
  if (isLinkKey(input)) {
    type = (input as string).split(":")?.[0];
  }

  if (isGraph(input)) {
    type = input._type;
  }

  return type ? !types.includes(type) : false;
};

export const fragmentsPlugin: Plugin = (state) => {
  const createFragmentManager = (fragmentId: number, initialDocument = {}) => {
    if (!fragmentId || !initialDocument) return null;

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
            root: `${definition.nodes.Fragment}:${fragmentId}`,
            temp: "Temp:root",
          };
        },
        // cssPlugin,
        styleSheetPlugin,
      ],
      skip: [
        isHtmlContent,
        isHTMLNode,
        isKey,
        allowTypes(Object.keys(definition.nodes)),
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
    key: `FragmentsPlugin:root`,
    createFragmentManager,
    getManager,
    getManagers,
  };

  state.mutate({
    _type: "FragmentsPlugin",
    _id: "root",
    managers: {},
  });

  return state;
};
