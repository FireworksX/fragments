import React, { Suspense, useContext, useMemo } from "react";
import { renderToString, createElement } from "@fragmentsx/render-core";
import { GlobalManagerContext } from "@/components/GlobalManager";
import { loadFragmentManager } from "@/helpers/loadFragmentManager";

function createResource(
  resourceCache,
  key: string,
  fetcher: () => Promise<any>
) {
  if (resourceCache.has(key)) return resourceCache.get(key);

  let status = "pending";
  let result: any;
  const suspender = fetcher().then(
    (r) => {
      status = "success";
      result = r;
    },
    (e) => {
      status = "error";
      result = e;
    }
  );

  const resource = {
    read() {
      if (status === "pending") throw suspender;
      if (status === "error") throw result;
      return result;
    },
  };

  resourceCache.set(key, resource);
  return resource;
}

export function reactSSRAdapter(PreactComponent: any) {
  const Wrapper = function ReactSSRWrapper(props: any) {
    const globalManager = useContext(GlobalManagerContext);

    if (globalManager && !("resourceCache" in globalManager)) {
      globalManager.resourceCache = new Map();
    }

    const resource = createResource(
      globalManager.resourceCache,
      props.fragmentId,
      () => loadFragmentManager(globalManager, props.fragmentId)
    );

    const documentManager = resource.read(); // Suspense ждёт

    const html = renderToString(
      createElement(PreactComponent, {
        ...props,
        globalManager: props?.globalManager ?? globalManager,
      })
    );

    return (
      <div
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  };

  return Wrapper;
}
