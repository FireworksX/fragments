import escapeHtml from "escape-html";
import { useDisplayColor } from "./useDisplayColor.ts";
import { isObject } from "@fragments/utils";

export const useSerializeText = () => {
  const { getColor } = useDisplayColor();

  const serialize = (node: any) => {
    if (isObject(node) && typeof node.text === "string") {
      const style = {};
      Object.entries(node).forEach(([key, value]) => {
        switch (key) {
          case "fontSize":
            style.fontSize = value;
            break;
          case "weight":
            style.fontWeight = value;
            break;
          case "lineHeight":
            style.lineHeight = value;
            break;
          case "letterSpacing":
            style.letterSpacing = value;
            break;
          case "align":
            style.textAlign = value;
            break;
          case "transform":
            style.textTransform = value;
            break;
          case "decoration":
            style.textDecoration = value;
            break;
          case "color":
            style.color = getColor(value);
            break;
        }
      });

      const string = escapeHtml(node.text);
      return <span style={style}>{string}</span>;
    }

    const children = Array.isArray(node)
      ? node.map(serialize)
      : node?.children?.map?.(serialize) || [];

    switch (node?.type) {
      case "quote":
        return (
          <blockquote>
            <p>{children}</p>
          </blockquote>
        );
      case "paragraph":
        return <div>{children}</div>;
      case "link":
        return <a href={escapeHtml(node.url)}>{children}</a>;
      default:
        return children;
    }
  };

  return serialize;
};
