import { generateId } from "@fragments/utils";
import { BaseNode, Extender } from "@/types";
import { CloneProps } from "@/types/props.ts";
import { baseExtend } from "@/extends/baseExtend";

export const cloneExtend: Extender = ({
  graph,
  graphKey,
  state,
}): CloneProps => {
  return {
    ...graph,
    overrides: graph?.overrides ?? [],
    clone(overrideNode: BaseNode) {
      const node = state.resolve(graphKey);
      const nextChildren = (node?.findChildren?.(() => true) ?? []).map(
        (child) => child.clone?.() ?? child
      );

      const nextEntity = {
        ...(overrideNode ?? {}),
        overrideFrom: graphKey,
        _type: node._type,
        _id: generateId(),
        children: nextChildren,
      };

      const cloneKey = state.mutate(nextEntity);
      state.mutate(graphKey, {
        overrides: [state.setKey(cloneKey)],
      });

      return cloneKey;
    },
  };
};

cloneExtend.symbol = Symbol("cloneExtend");
