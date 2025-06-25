import { LinkKey } from "@graph-state/core";
import { useContext, useMemo } from "preact/compat";
import { useLayerValue } from "@/shared/hooks/useLayerValue";
import { toPx } from "@fragmentsx/utils";
import { definition } from "@fragmentsx/definition";
import { FragmentContext } from "@/components/Fragment/FragmentContext";
import { useCalcLayerBorder } from "@/shared/hooks/useLayerStyles/useCalcLayerBorder";

function cssToJsStyle(cssKey) {
  return cssKey.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}

function cssStringToJsObject(cssString) {
  const jsStyles = {};
  const declarations = cssString.split(";");

  declarations.forEach((decl) => {
    if (!decl.trim()) return; // Пропускаем пустые строки

    const [property, value] = decl.split(":").map((s) => s.trim());
    if (!property || !value) return; // Пропускаем некорректные строки

    const jsProperty = cssToJsStyle(property);
    jsStyles[jsProperty] = value;
  });

  return jsStyles;
}

export const useLayerCssOverride = (layerKey: LinkKey) => {
  const { manager: fragmentManager } = useContext(FragmentContext);
  const [cssOverride, , info] = useLayerValue(
    layerKey,
    "cssOverride",
    fragmentManager
  );

  return cssStringToJsObject(cssOverride);
};
