import { LinkKey, Plugin } from "@graph-state/core";
import { isObject } from "@fragmentsx/utils";

declare module "@graph-state/core" {
  interface GraphState {
    $ssr: {
      extractData: () => unknown;
      restoreData: (input: unknown) => void;
    };
  }
}

export const scopesPlugin: Plugin = (state) => {
  const scopesMap = new Map();

  const registerScope = (layerKey: LinkKey, scopeValue) => {
    scopesMap.set(layerKey, scopeValue);
  };

  state.$scopes = {
    scopes: scopesMap,
    registerScope,
  };

  return state;
};
