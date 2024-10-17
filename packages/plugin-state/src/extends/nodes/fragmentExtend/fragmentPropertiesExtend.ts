import { Extender } from "@/types";
import { Entity } from "@graph-state/core";
import { variableType } from "@/definitions.ts";

export const fragmentPropertiesExtend: Extender = ({
  getValue,
  graph,
  state,
  graphKey,
}) => {
  const creatorsMethodsMap = {
    [variableType.Number]: state.createNumberVariable,
    [variableType.Boolean]: state.createBooleanVariable,
    [variableType.String]: state.createStringVariable,
  };

  return {
    properties: getValue("properties", []),
    createProperty: (type: keyof typeof variableType) => {
      const createdProperty = creatorsMethodsMap[type]?.();

      if (createdProperty) {
        state.mutate(graphKey, {
          properties: [createdProperty],
        });

        return state.resolve(createdProperty);
      }

      return null;
    },
    // addProperty: (variable) => {
    //   state.mutate(graphKey, {
    //     props: [variable],
    //   });
    // },
    removeProperty: (prop: Entity) => {
      state.invalidate(prop);
    },
  };
};
