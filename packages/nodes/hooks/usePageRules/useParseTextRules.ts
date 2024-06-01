import { useContext } from "preact/compat";
import { TemplateContext } from "../../TemplateProvider.tsx";
import { useSerializeText } from "../useSerializeText.tsx";
import { useLayerInvokerNew } from "../useLayerInvokerNew.ts";

export const useParseTextRules = (layerField: Field) => {
  const { statex } = useContext(TemplateContext);
  const layerValue = useStatex(statex, layerField);
  const layerInvoker = useLayerInvokerNew(layerField);
  const serialize = useSerializeText();

  let content = "";

  if (layerValue?._type === constants.Text) {
    content = serialize(layerInvoker("content").value);
  }

  return content;
};
