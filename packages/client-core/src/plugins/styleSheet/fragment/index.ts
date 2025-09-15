import { Entity, Graph, GraphState, LinkKey, Plugin } from "@graph-state/core";
import { getAllChildren } from "../utils/getAllChildren";
import { buildCssBlock } from "@/plugins/styleSheet/utils/buildCssBlock";
import { findGroups } from "@/plugins/styleSheet/utils/findGroups";
import { makeCss } from "@/plugins/styleSheet/utils/makeCss";
import { PLUGIN_TYPES } from "@/fragmentsClient";
import { autoInjector } from "@/plugins/styleSheet/utils/autoInjector";
import { setKey } from "@fragmentsx/utils";
import { CSSRules } from "@/plugins/styleSheet/utils/compareRules";

/**
 * Тип для кэша стилей слоя
 */
export type LayerStyles = Record<string, CSSRules>;

export type LayerResolver = GraphState["resolve"];

interface StyleSheetState {
  cache: LayerCache;
  addStyle: (
    layerKey: LinkKey,
    styles: Record<string, string>,
    layer: any
  ) => void;
  registerLayerStyle: (
    layerKey: LinkKey,
    styles: Record<string, string>,
    layer: any
  ) => void;
  extract: () => Array<{ fragment: string; styles: string[] }>;
}

/**
 * Генерация CSS-блоков для primary breakpoint
 */
function generatePrimaryCssBlocks(
  layerResolver: LayerResolver,
  group: any,
  cssMaker: (entity: Entity) => { hash: string; css: string }
) {
  const children = getAllChildren(layerResolver, group.primary);
  return children.map(cssMaker).map(buildCssBlock);
}

/**
 * Генерация CSS-блоков для smaller breakpoints
 */
function generateSmallerCssBlocks(
  layerResolver: LayerResolver,
  group: any,
  cssMaker: (entity: Entity) => { hash: string; css: string }
) {
  return (group.smaller as any[]).map(
    (smallerLayer: any, index: number, arr: any[]) => {
      const smallerChildren = getAllChildren(layerResolver, smallerLayer);
      const smallerCssBlocks = smallerChildren.map(cssMaker);
      const max = index === 0 ? group.primary.width - 1 : arr[index - 1].width;
      return `@container (max-width: ${max}px) {${smallerCssBlocks
        .map(buildCssBlock)
        .join("")}}`;
    }
  );
}

/**
 * Генерация CSS-блоков для larger breakpoints
 */
function generateLargerCssBlocks(
  layerResolver: LayerResolver,
  group: any,
  cssMaker: (entity: Entity) => { hash: string; css: string }
) {
  return (group.larger as any[]).map(
    (largerLayer: any, index: number, arr: any[]) => {
      const largerChildren = getAllChildren(layerResolver, largerLayer);
      const largerCssBlocks = largerChildren.map(cssMaker);

      const min = largerLayer.width;
      const max = index < arr.length - 1 ? arr[index + 1].width - 1 : null;
      const containerQuery = max
        ? `@container (min-width: ${min}px) and (max-width: ${max}px)`
        : `@container (min-width: ${min}px)`;

      return `${containerQuery} {${largerCssBlocks
        .map(buildCssBlock)
        .join("")}}`;
    }
  );
}

/**
 * Извлекает стили для всех фрагментов
 */
function extractStyleSheet(styles: LayerStyles, layerResolver: LayerResolver) {
  const [group] = findGroups(styles, layerResolver);

  if (!group) {
    return [];
  }

  const cssMaker = makeCss(styles, layerResolver);

  const fragmentCssRules: string[] = [];
  // Основной слой
  fragmentCssRules.push(buildCssBlock(cssMaker(group.fragmentLayerKey)));

  // Primary breakpoint
  const primaryStyles = generatePrimaryCssBlocks(
    layerResolver,
    group,
    cssMaker
  );

  fragmentCssRules.push(...primaryStyles);

  // Smaller breakpoints
  fragmentCssRules.push(
    ...generateSmallerCssBlocks(layerResolver, group, cssMaker)
  );

  // Larger breakpoints
  fragmentCssRules.push(
    ...generateLargerCssBlocks(layerResolver, group, cssMaker)
  );

  return fragmentCssRules;
}

export const fragmentStylesheetPlugin: Plugin = (state) => {
  const KEY = `${PLUGIN_TYPES.FragmentStylesheet}:root`;

  // Инициализация $styleSheet
  const styleSheet: StyleSheetState = {
    key: KEY,
    cache: new Map(),
    addStyle: (layerKey, styles, layer) =>
      styleSheet.cache.set(layerKey, { styles, layer }),
    // extract: () => extractStyleSheet(state),
  };

  const addStyle = (layerKey: LinkKey, style: string) => {
    state.mutate(KEY, {
      styles: {
        [layerKey]: style,
      },
    });
  };

  state.mutate(KEY, {
    styles: {},
  });

  autoInjector(state.key, state, KEY, (graph) => {
    return extractStyleSheet(graph.styles, state.resolve);
  });

  state.$styleSheet = {
    key: KEY,
    addStyle,
    extract: (withTag?: boolean) => {
      const graph = state.resolve(KEY);
      const styles: string[] = extractStyleSheet(graph?.styles, state.resolve);
      const resultStyle = styles.join("\n");

      if (withTag) {
        const id = state.entityOfKey(state.$fragment?.root);
        return `<style id="fragment-${id._id}">${resultStyle}</style>`;
      }

      return resultStyle;
    },
  };

  return state;
};
