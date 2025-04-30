import { renderToStaticMarkup } from "react-dom/server";
import { GraphState } from "@graph-state/core";
import { GlobalManager, StyleSheetProvider } from "@fragmentsx/render-core";
import { Fragment } from "@/components/Fragment";
import React, { createContext, useContext } from "react";

export const collectStyles = (globalManager: GraphState) => {
  if (!globalManager) return null;

  const allFragments = globalManager.resolve(
    globalManager.key
  ).fragmentsManagers;

  const extractors = Object.entries(allFragments)
    .filter(([, value]) => !!value?.resolve)
    .map(([fragmentId, manager]) => {
      // renderToStaticMarkup(
      //   // <GlobalManager value={globalManager}>
      //   //   <StyleSheetProvider value={manager?.styleSheetCache}>
      //   <Aomp />
      //   // </StyleSheetProvider>
      //   // </GlobalManager>
      // );

      return manager.extractStyleSheet()?.at(0);
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
