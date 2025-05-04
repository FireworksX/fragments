import { useContext, useEffect, useLayoutEffect } from "preact/compat";
import { GraphState, LinkKey } from "@graph-state/core";
import { getStylesheetKey } from "@/shared/helpers/getStylesheetKey";
import { useGraph } from "@graph-state/react";
import { FragmentContext } from "@/components/Fragment/FragmentContext";
import { isBrowser } from "@fragmentsx/utils";

export function useInjectedStyle() {
  const { manager } = useContext(FragmentContext);

  const injectStyle = () => {
    const styles = manager?.extractStyleSheet()?.at(0)?.styles;

    if (isBrowser && styles) {
      const stylesheetKey = getStylesheetKey(manager?.key);

      if (document.getElementById(stylesheetKey)) {
        const el = document.getElementById(stylesheetKey);
        if (el) el.remove();
      }

      const style = document.createElement("style");
      style.id = stylesheetKey;
      style.textContent = styles.join("");
      document.head.appendChild(style);
    }

    // return () => {
    //   const el = document.getElementById(stylesheetKey);
    //   if (el) el.remove();
    // };
  };

  return {
    injectStyle,
  };

  // const [globalLayer] = useGraph(globalManager, globalManager.key);

  // useEffect(() => {
  //   if (!globalManager) {
  //     return () => null;
  //   }
  //
  //   const allFragments = globalManager.resolve(
  //     globalManager.key
  //   ).fragmentsManagers;
  //
  //   const extractors = Object.entries(allFragments)
  //     .filter(([, value]) => !!value?.resolve)
  //     .map(([fragmentId, manager]) => {
  //       // renderToStaticMarkup(
  //       //   <GlobalManager value={globalManager}>
  //       //     <StyleSheetProvider value={manager?.styleSheetCache}>
  //       //       {App}
  //       //     </StyleSheetProvider>
  //       //   </GlobalManager>
  //       // );
  //       const a = manager.extractStyleSheet()?.at(0);
  //       return a;
  //     });
  //
  //   // console.log(extractors);
  //
  //   const stylesheetKey = getStylesheetKey(fragmentKey);
  //
  //   if (document.getElementById(stylesheetKey)) return;
  //
  //   const style = document.createElement("style");
  //   style.id = stylesheetKey;
  //   style.textContent = css;
  //   document.head.appendChild(style);
  //
  //   return () => {
  //     const el = document.getElementById(stylesheetKey);
  //     if (el) el.remove();
  //   };
  // }, [globalLayer]);
}
