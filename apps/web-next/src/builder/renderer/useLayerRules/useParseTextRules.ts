import { useContext } from "preact/compat";
import { useSerializeText } from "../useSerializeText.tsx";
import { useLayerInvokerNew } from "../useLayerInvokerNew.ts";
import { GraphStateContext } from "../../src/GraphStateProvider.tsx";
import { useGraph } from "@graph-state/react";
import { builderNodes } from "@fragments/fragments-plugin";

export const useParseTextRules = (layerField: Field) => {
  const { graphState } = useContext(GraphStateContext);
  const [layerValue] = useGraph(graphState, layerField);
  const layerInvoker = useLayerInvokerNew(layerField);
  const serialize = useSerializeText();

  let content = "";

  if (layerValue?._type === builderNodes.Text) {
    content = "hello world"; //serialize(layerInvoker("content").value);
  }

  return content;
};
