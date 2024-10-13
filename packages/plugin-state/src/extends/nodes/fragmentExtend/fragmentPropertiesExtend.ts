import { Extender } from "@/types";
import { Entity } from "@graph-state/core";
import { propertyType } from "@/definitions.ts";

export const fragmentPropertiesExtend: Extender = ({
  getValue,
  graph,
  state,
  graphKey,
}) => {
  const creatorsMethodsMap = {
    [propertyType.Number]: state.createNumberProperty,
    [propertyType.Boolean]: state.createBooleanProperty,
    [propertyType.String]: state.createStringProperty,
  };

  return {
    properties: getValue("properties", []),
    createProperty: (type: keyof typeof propertyType) => {
      const createdPropertyLink = creatorsMethodsMap[type]?.();

      if (createdPropertyLink) {
        state.mutate(graphKey, {
          properties: [createdPropertyLink],
        });

        return createdPropertyLink;
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
