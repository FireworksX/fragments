import { LinkKey, Plugin } from "@graph-state/core";
import { findGroups } from "./findGroups";
import { makeCss } from "./makeCss";
import { getAllChildren } from "./getAllChildren";
import { buildCssBlock } from "./buildCssBlock";

export const styleSheetPlugin: Plugin = (state) => {
  const extractStyleSheet = () => {
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

  state.$styleSheet = {
    cache: new Map(),
    addStyle: (layerKey: LinkKey, styles, layer) =>
      state.$styleSheet?.cache?.set(layerKey, { styles, layer }),
    extract: extractStyleSheet,
  };
};
