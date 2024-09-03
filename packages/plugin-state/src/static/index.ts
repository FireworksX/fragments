import { LinkKey, Plugin } from "@graph-state/core";
import { overrides } from "./overrides.ts";
import { getKey, setKey } from "@/shared/utils";
import pkg from "package.json";
import { moveNode } from "@/static/moveNode.ts";
import { index } from "@/static/creators";
import { restoreVariableField } from "@/shared/restoreVariableField.ts";

export const addStatic: Plugin = (state) => {
  overrides(state);
  moveNode(state);
  index(state);

  state.getKey = getKey;
  state.setKey = setKey;

  state.pluginStateVesion = pkg.version;

  state.restoreField = (targetLink: LinkKey, field: string) => {
    const targetNode = state.resolve(targetLink);
    if (targetNode) {
      const fieldValue = targetNode[field];
      const restoreNode = restoreVariableField([targetNode], fieldValue, field);
      state.mutate(restoreNode);
    }
  };
};
