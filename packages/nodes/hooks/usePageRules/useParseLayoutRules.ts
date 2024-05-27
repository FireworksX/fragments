import { Field } from "@adstore/statex/src";
import * as CSS from "csstype";
import { toPx } from "../../helpers/toPx.ts";
import { useLayerInvokerNew } from "../useLayerInvokerNew.ts";
import {
  builderLayerDirection,
  builderLayerMode,
} from "@adstore/web/src/data/promos/creators";
import { useContext } from "preact/compat";
import { GraphStateContext } from "../../src/GraphStateProvider.tsx";

export const useParseLayoutRules = (layerField: Field) => {
  const { graphState } = useContext(GraphStateContext);
  const layerInvoker = useLayerInvokerNew(layerField);
  const rules: CSS.Properties = {};

  const isFlex = layerInvoker("layerMode").value === builderLayerMode.flex;
  if (isFlex) {
    rules.display = "flex";
    rules.flexDirection =
      layerInvoker("layerDirection").value === builderLayerDirection.horizontal
        ? "row"
        : "column";
    rules.alignItems = layerInvoker("layerAlign").value;
    rules.justifyContent = layerInvoker("layerDistribute").value;
    rules.flexWrap = layerInvoker("layerWrap").value ? "wrap" : "nowrap";
    rules.gap = toPx(+layerInvoker("layerGap").value ?? 0);
  }

  const padding = layerInvoker("padding").value;
  if (padding === graphState.mixed) {
    try {
      rules.paddingTop = toPx(layerInvoker("paddingTop").value);
      rules.paddingRight = toPx(layerInvoker("paddingRight").value);
      rules.paddingBottom = toPx(layerInvoker("paddingBottom").value);
      rules.paddingLeft = toPx(layerInvoker("paddingLeft").value);
    } catch (e) {
      // console.error(e, padding, layerField, statex, statex?.resolve(layerField))
    }
  } else {
    rules.padding = toPx(padding);
  }

  return rules;
};
