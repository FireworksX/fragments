import { Field } from "@adstore/statex";
import { useLayerInvoker } from "../useLayerInvoker.ts";
import { useLayerInvokerNew } from "../useLayerInvokerNew.ts";

export const useParseChildren = (field: Field) => {
  const layerValue = useLayerInvokerNew(field);

  return layerValue("children").value;
};
