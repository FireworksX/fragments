import { FC } from "react";
import { LinkKey } from "@graph-state/core";
import {
  GlobalManager,
  InstanceContext,
  StyleSheetProvider,
  useInstance,
} from "@fragmentsx/render-core";
import { Fragment } from "@/components/Fragment";
import { isBrowser } from "@/helpers/isBrowser";
import { loadFragmentManager } from "@/helpers/loadFragmentManager";
// import { createResource } from "@/hocs/reactSSRAdapter";

export function createResource(
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

export interface InstanceProps {
  layerKey?: LinkKey;
  fragmentId?: string;
  props?: Record<string, unknown>;
  globalManager?: unknown;
}

const InstanceInitial: FC<InstanceProps> = (instanceProps) => {
  const {
    styles,
    fragmentId,
    parentManager,
    props,
    hash,
    innerManager,
    definitions,
    globalManager,
  } = useInstance(instanceProps);

  if (!isBrowser) {
    if (globalManager && !("resourceCache" in globalManager)) {
      globalManager.resourceCache = new Map();
    }

    const resource = createResource(
      globalManager.resourceCache,
      fragmentId,
      () => loadFragmentManager(globalManager, fragmentId)
    );

    const documentManager = resource.read(); // Suspense ждёт
  }

  return (
    <InstanceContext.Provider
      value={{
        layerKey: instanceProps.layerKey,
        definitions,
        innerManager,
        parentManager,
        props,
      }}
    >
      {parentManager ? (
        <div className={hash} data-key={instanceProps.layerKey}>
          <Fragment fragmentId={fragmentId} globalManager={globalManager} />
        </div>
      ) : (
        <Fragment fragmentId={fragmentId} globalManager={globalManager} />
      )}
    </InstanceContext.Provider>
  );
};

export const Instance = (props) => {
  return "globalManager" in props ? (
    <GlobalManager value={props.globalManager}>
      <InstanceInitial {...props} />
    </GlobalManager>
  ) : (
    <InstanceInitial {...props} />
  );
};
