import { Plugin } from "@graph-state/core";
import { isObject } from "@fragmentsx/utils";

export const ssrPlugin: Plugin = (state) => {
  if (!["$fragments"].every((field) => field in state)) {
    console.error("SSRPlugin depends from Fragments plugin");
    return state;
  }

  const cacheDocuments = state?.$fetch?.cacheDocuments as Map<any, any>;
  const cacheLinks = state?.$fetch?.cacheLinks;
  const createManager = state?.$fragments?.createFragmentManager;

  const fromMap = (map) => {
    return Array.from(map).reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});
  };

  const extractData = () => {
    const documents = fromMap(cacheDocuments.entries());
    const links = fromMap(cacheLinks.entries());

    return {
      documents,
      links,
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

    if ("cacheLinks" in input && isObject(input.cacheLinks)) {
      Object.entries(input.cacheLinks).forEach(([fragmentId, doc]) => {
        cacheLinks.set(+fragmentId, doc);
        createManager(+fragmentId, doc);
      });
    }
  };

  state.$ssr = {
    extractData,
    restoreData,
  };

  return state;
};
