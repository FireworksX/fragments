import { GraphState, LinkKey, Plugin } from "@graph-state/core";
import { autoInjector } from "@/plugins/styleSheet/utils/autoInjector";
import { PLUGIN_TYPES } from "@/fragmentsClient";
import globalCss from "./global.css?raw";

interface StyleSheetState {
  cache: Map<string, string>;
  addStyle: (
    layerKey: LinkKey,
    styles: Record<string, string>,
    layer: any
  ) => void;
  extract: () => Array<{ fragment: string; styles: string[] }>;
  extractFragmentStylesheets: () => unknown; //Array<{ fragment: string; styles: string[] }>;
}

const extractFragmentStylesheets = (state: GraphState) => {
  // const allFragments = state.$fragments.getManagers();
  // const extractors = Object.entries(allFragments)
  //   .filter(([, value]) => !!value?.resolve)
  //   .map(([, manager]) => manager.$styleSheet.extract());
  //
  // const extractedStyles = await Promise.all(extractors);
  //
  // return Object.values(
  //   extractedStyles.reduce((acc, extrected) => {
  //     Object.entries(extrected).forEach(([key, styleTag]) => {
  //       acc[key] = styleTag;
  //     });
  //
  //     return acc;
  //   }, {})
  // );
};

export const globalStylesheetPlugin: Plugin = (state) => {
  if (!("$fragments" in state)) {
    throw new Error("GlobalStylesheetPlugin need $fragments plugin");
  }

  const KEY = `${PLUGIN_TYPES.GlobalStylesheet}:root`;

  const styleSheet: StyleSheetState = {
    cache: new Map(),
    addStyle: (layerKey, styles, layer) =>
      styleSheet.cache.set(layerKey, { styles, layer }),
    extractFragmentStylesheets,
  };

  const addStyle = (style: string) => {
    state.mutate(KEY, {
      styles: [style],
    });
  };

  state.mutate({
    _type: PLUGIN_TYPES.GlobalStylesheet,
    _id: "root",
    styles: [],
  });

  autoInjector("global", state, KEY);

  state.$globalStylesheet = {
    key: KEY,
    addStyle,

    extractStyles: () => {
      const allFragments = state.$fragments.getManagers();
      const styles = Object.entries(allFragments)
        .filter(([, value]) => !!value?.resolve)
        .map(([, manager]) => manager.$styleSheet.extract(true));

      return styles.join("");
    },
  };

  addStyle(globalCss);

  return state;
};
