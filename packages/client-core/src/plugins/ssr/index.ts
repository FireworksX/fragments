import { Plugin } from "@graph-state/core";
import { isObject } from "@fragmentsx/utils";

declare module "@graph-state/core" {
  interface GraphState {
    $ssr: {
      extractData: () => unknown;
      restoreData: (input: unknown) => void;
    };
  }
}

export const ssrPlugin: Plugin = (state) => {
  if (!["$fragments"].every((field) => field in state)) {
    console.error("SSRPlugin depends from Fragments plugin");
    return state;
  }

  const cacheDocuments = state?.$fetch?.cacheDocuments;
  const cacheAreas = state?.$fetch?.cacheAreaDocuments;
  const createManager = state?.$fragments?.createFragmentManager;

  const fromMap = (map) => {
    return Array.from(map).reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});
  };

  const extractData = () => {
    const documents = fromMap(cacheDocuments.entries());
    const areas = fromMap(cacheAreas.entries());

    return {
      documents,
      areas,
    };
  };

  const restoreData = (input: unknown) => {
    if (!input || (typeof input !== "object" && !Array.isArray(input)))
      return null;

    if ("documents" in input && isObject(input.documents)) {
      Object.entries(input.documents).forEach(([fragmentId, doc]) => {
        cacheDocuments.set(+fragmentId, doc);
        createManager(+fragmentId, doc);
      });
    }

    if ("areas" in input && isObject(input.areas)) {
      Object.entries(input.areas).forEach(([areaCode, entity]) => {
        cacheAreas.set(areaCode, entity);
      });
    }
  };

  state.$ssr = {
    extractData,
    restoreData,
  };

  return state;
};
