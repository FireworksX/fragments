import { renderToStaticMarkup } from "react-dom/server";
import { GraphState } from "@graph-state/core";
import { GlobalManager, StyleSheetProvider } from "@fragmentsx/render-core";
import { Fragment } from "@/components/Fragment";
import React, { createContext, useContext, useState } from "react";

export const collectStyles = (globalManager: GraphState) => {
  if (!globalManager) return null;

  // renderToStaticMarkup(
  //   <GlobalManager value={globalManager}>
  //     <StyleSheetProvider value={globalManager?.styleSheetCache}>
  //       {App}
  //     </StyleSheetProvider>
  //   </GlobalManager>
  // );

  const allFragments = globalManager.$fragments.getManagers();

  const extractors = Object.entries(allFragments)
    .filter(([, value]) => !!value?.resolve)
    .map(([fragmentId, manager]) => {
      // renderToStaticMarkup(
      //   <GlobalManager value={globalManager}>
      //     <StyleSheetProvider value={manager?.styleSheetCache}>
      //       {App}
      //     </StyleSheetProvider>
      //   </GlobalManager>
      // );
      return manager?.$styleSheet?.extract?.()?.at(0);
    });

  return extractors.map((extractor) => (
    <style
      id={`fragments-${extractor?.fragment}`}
      dangerouslySetInnerHTML={{ __html: extractor?.styles.join("") }}
    />
  ));

  // const extractedStyles = await Promise.all(extractors);
  //
  // return Object.values(
  //   extractors.reduce((acc, extrected) => {
  //     Object.entries(extrected).forEach(([key, styleTag]) => {
  //       acc[key] = styleTag;
  //     });
  //
  //     return acc;
  //   }, {})
  // );
};
