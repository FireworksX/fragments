import { GraphState, Plugin } from "@graph-state/core";
import ssrPrepass from "preact-ssr-prepass";
import { Fragment } from "@/components/Fragment";
import { GlobalManager } from "@/providers/GlobalManager";
import { StyleSheetProvider } from "@/providers/StyleSheetProvider";
import { findGroups } from "@/managers/styleSheetPlugin/findGroups";
import { makeCss } from "@/managers/styleSheetPlugin/makeCss";
import { getAllChildren } from "@/managers/styleSheetPlugin/getAllChildren";
import { generateCss } from "@/managers/cssPlugin/generateCss";
import { diffCss } from "@/managers/cssPlugin/diffCss";
import { buildCssBlock } from "@/managers/styleSheetPlugin/buildCssBlock";

export const styleSheetPlugin =
  (globalManager: GraphState): Plugin =>
  (state) => {
    state.styleSheetCache = new Map();

    state.extractStyleSheet = () => {
      // state.styleSheetCache.clear();
      const rootLayer = state.resolve(state.$fragment.root);

      // await ssrPrepass(
      //   <GlobalManager.Provider value={globalManager}>
      //     <StyleSheetProvider value={state.styleSheetCache}>
      //       <Fragment fragmentId={rootLayer._id} />
      //     </StyleSheetProvider>
      //   </GlobalManager.Provider>
      // );

      const fragments = findGroups(state);
      const cssMaker = makeCss(state);

      const fragmentsStyle = fragments.map((group) => {
        const fragmentCssRules: string[] = [];

        fragmentCssRules.push(buildCssBlock(cssMaker(group.fragment)));

        const children = getAllChildren(state, group.primary);
        const primaryCssBlocks = children.map(cssMaker);

        primaryCssBlocks.forEach((block) => {
          fragmentCssRules.push(buildCssBlock(block));
        });

        group.smaller.forEach((smallerLayer, index, arr) => {
          const smallerChildren = getAllChildren(state, smallerLayer);
          const smallerCssBlocks = smallerChildren.map(cssMaker);

          const max =
            index === 0 ? group.primary.width - 1 : arr[index - 1].width;

          fragmentCssRules.push(
            `@container (max-width: ${max}px) {${smallerCssBlocks
              .map(buildCssBlock)
              .join("")}}`
          );
        });

        group.larger.forEach((largerLayer, index, arr) => {
          const largerChildren = getAllChildren(state, largerLayer);

          const largerCssBlocks = largerChildren.map((l) => cssMaker(l, 123));

          const min = largerLayer.width;
          const max = index < arr.length - 1 ? arr[index + 1].width - 1 : null;

          const containerQuery = max
            ? `@container (min-width: ${min}px) and (max-width: ${max}px)`
            : `@container (min-width: ${min}px)`;

          fragmentCssRules.push(
            `${containerQuery} {${largerCssBlocks.map(buildCssBlock).join("")}}`
          );
        });

        return {
          fragment: state.keyOfEntity(group.fragment),
          styles: fragmentCssRules,
        };
      });

      return fragmentsStyle;
    };
  };
