import { Graph, isLinkKey, LinkKey, Plugin } from "@graph-state/core";
import { overrides } from "./overrides.ts";
import { getKey, setKey } from "@/shared";
import pkg from "package.json";
import { moveNode } from "@/static/moveNode.ts";
import { creators } from "@/static/creators";
import { restoreVariableField } from "@/shared/restoreVariableField.ts";
import { toJSON } from "@/static/toJSON.ts";
import { isObject, isPrimitive } from "@fragments/utils";

export const addStatic: Plugin = (state) => {
  overrides(state);
  moveNode(state);
  creators(state);
  toJSON(state);

  state.getKey = getKey;
  state.setKey = setKey;

  state.pluginStateVesion = pkg.version;

  state.fragment = state.resolve(state)?.fragment;

  state.restoreField = (targetLink: LinkKey, field: string) => {
    const targetNode = state.resolve(targetLink);
    if (targetNode) {
      const fieldValue = targetNode[field];
      const restoreNode = restoreVariableField([targetNode], fieldValue, field);
      state.mutate(restoreNode);
    }
  };

  state.applyFragmentModule = (fragmentModule: Graph) => {
    state.mutate(fragmentModule);
    // (fragmentModule?.layers ?? []).forEach((graph) => {
    //   state.mutate(graph);
    // });
  };

  state.applyTreeState = (stateGraphs: Graph[]) => {
    const build = (node: unknown) => {
      if (isPrimitive(node) && node) {
        const entity = state.entityOfKey(node);
        const findGraph = stateGraphs.find(
          (graph) => graph._id === entity?._id && graph._type === entity?._type
        );

        return findGraph ? build(findGraph) : node;
      }

      return Object.entries(node).reduce((acc, [key, value]) => {
        if (isPrimitive(value) && value) {
          if (isLinkKey(value)) {
            const entity = state.entityOfKey(value);
            const findGraph = stateGraphs.find(
              (graph) =>
                graph._id === entity?._id && graph._type === entity?._type
            );

            return { ...acc, [key]: findGraph ?? value };
          } else {
            return { ...acc, [key]: value };
          }
        }

        if (Array.isArray(value) && value.length) {
          return { ...acc, [key]: value.map(build) };
        }

        if (isObject(value)) {
          return { ...acc, [key]: build(value) };
        }

        return acc;
      }, {});
    };

    const fragmentNode = stateGraphs.find(
      (graph) => graph._type === "Fragment" && graph._id === "g34gherhg3g"
    );

    const treeState = build(fragmentNode);

    state.mutate(treeState);
  };
};
