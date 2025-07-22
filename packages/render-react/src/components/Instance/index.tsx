import { FC, Suspense } from "react";
import { LinkKey } from "@graph-state/core";
import {
  GlobalManager,
  InstanceContext,
  StyleSheetProvider,
  useInstance,
} from "@fragmentsx/render-core";
import { Fragment } from "@/components/Fragment";

interface InstanceOptions {
  ssr?: boolean;
}

export interface InstanceProps {
  layerKey?: LinkKey;
  fragmentId?: string;
  props?: Record<string, unknown>;
  options?: InstanceOptions;
  globalManager?: unknown;
}

const InstanceInitial: FC<InstanceProps> = (instanceProps) => {
  const ssr = instanceProps?.options?.ssr ?? true;
  const {
    styles,
    fragmentId,
    cssProps,
    parentManager,
    props,
    hash,
    innerManager,
    definitions,
    globalManager,
  } = useInstance(instanceProps);

  if (ssr) {
    globalManager?.$load?.loadFragment?.(fragmentId, { suspense: true });
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
        <div style={cssProps}>
          <Fragment fragmentId={fragmentId} globalManager={globalManager} />
        </div>
      )}
    </InstanceContext.Provider>
  );
};

export const Instance = (props) => {
  return "globalManager" in props ? (
    <Suspense fallback={<h1>Test</h1>}>
      <GlobalManager value={props.globalManager}>
        <InstanceInitial {...props} />
      </GlobalManager>
    </Suspense>
  ) : (
    <Suspense fallback={<h1>Test</h1>}>
      <InstanceInitial {...props} />
    </Suspense>
  );
};
