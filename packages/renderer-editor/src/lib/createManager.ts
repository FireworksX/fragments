import { createState, LinkKey } from "@graph-state/core";
import { createLayer } from "@/lib/createLayer.ts";

export const createManager = (fragmentKey: LinkKey, initialDocument = {}) => {
  const normalizeDocument = Object.entries(initialDocument).reduce(
    (acc, [key, value]) => {
      acc[key] = createLayer(value);
      return acc;
    },
    {}
  );

  const manager = createState({
    _type: "FragmentManager",
    initialState: normalizeDocument,
    plugins: [
      (state) => {
        state.$fragment = {
          root: fragmentKey,
        };
      },
    ],
  });

  return manager;
};
