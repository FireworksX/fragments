import { Field } from "@adstore/statex/src";
import * as CSS from "csstype";
import { useLayerInvokerNew } from "../useLayerInvokerNew.ts";
import isBrowser from "@adstore/web/src/utils/isBrowser.ts";
import { EntityKey } from "@adstore/web/src/types/props.ts";
import { useContext } from "preact/compat";
import { GraphStateContext } from "../../src/GraphStateProvider.tsx";

const getCssRules = (cssText?: string) => {
  const rules: CSS.Properties = {};
  const placeholderNode = isBrowser && document.createElement("div");

  if (placeholderNode && typeof cssText === "string") {
    placeholderNode.style.cssText = cssText;
    Object.entries(placeholderNode.style)
      .filter(([key, value]) => value?.length && isNaN(+key))
      .forEach(([key, value]) => (rules[key] = value));
  }

  return rules;
};

export const useParseCssRules = (layerField: Field) => {
  const { graphState } = useContext(GraphStateContext);
  const layerInvoker = useLayerInvokerNew(layerField);
  const cssText = layerInvoker("cssText");
  const cssLinks = layerInvoker("cssLinks");

  const cssTextRules = getCssRules(cssText.value);
  const cssLinkRules = cssLinks.value?.reduce?.((acc, link: EntityKey) => {
    const linkValue = graphState?.resolve(link);
    if (linkValue) {
      return {
        ...acc,
        ...getCssRules(linkValue.cssText),
      };
    }

    return acc;
  }, {});

  return {
    ...cssLinkRules,
    ...cssTextRules,
  };
};
