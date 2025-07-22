import { Graph, GraphState, LinkKey } from "@graph-state/core";
import { isBrowser } from "@fragmentsx/utils";

export const autoInjector = (
  key: string,
  state: GraphState,
  graphKey: LinkKey,
  transformStyles?: (graph: Graph) => string[]
) => {
  const injectStyle = (styles: string) => {
    if (isBrowser && styles) {
      if (document.getElementById(key)) {
        const el = document.getElementById(key);
        if (el) el.remove();
      }

      const style = document.createElement("style");
      style.id = key;
      style.textContent = styles;
      document.head.appendChild(style);
    }

    // return () => {
    //   const el = document.getElementById(stylesheetKey);
    //   if (el) el.remove();
    // };
  };

  state.subscribe(graphKey, (next) => {
    const styles: string[] = transformStyles?.(next) ?? next?.styles ?? [];
    const resultStyle = styles.join("\n");

    injectStyle(resultStyle);
  });
};
