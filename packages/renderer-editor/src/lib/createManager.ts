import { createState, LinkKey } from "@graph-state/core";
import { getLayerSchema } from "@/lib/getLayerSchema.ts";
import { getOverriderByLayers } from "@/shared/helpers/getOverriderByLayers.ts";
import { parseRawLayer } from "@/lib/parseRawLayer.ts";

export const createManager = (fragmentKey: LinkKey, initialDocument = {}) => {
  // const layers = Object.values(initialDocument);
  // const normalizeDocument = Object.entries(initialDocument).reduce(
  //   (acc, [key, value]) => {
  //     const layerSchema = getLayerSchema(value);
  //     const overrider = getOverriderByLayers(key, layers);
  //     const layer = parseRawLayer(layerSchema, value, {
  //       overrideTarget: overrider,
  //       withFallback: false,
  //     });
  //
  //     acc[key] = layer ?? value;
  //     return acc;
  //   },
  //   {}
  // );

  const manager = createState({
    _type: "FragmentManager",
    initialState: initialDocument,
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
