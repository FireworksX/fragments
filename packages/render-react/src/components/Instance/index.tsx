import { ComponentPropsWithoutRef, ElementType, FC, Suspense } from "react";
import { definition } from "@fragmentsx/definition";
import { LinkKey } from "@graph-state/core";
import {
  GlobalManager,
  InstanceContext,
  StyleSheetProvider,
  useInstance,
} from "@fragmentsx/render-core";
import { Fragment } from "@/components/Fragment";
import { Scope } from "@/providers/Scope";

interface InstanceOptions {
  ssr?: boolean;
}

export interface InstanceProps extends ComponentPropsWithoutRef<"div"> {
  FrameElement?: ElementType;
  layerKey?: LinkKey;
  fragmentId?: string;
  props?: Record<string, unknown>;
  options?: InstanceOptions;
  globalManager?: unknown;
  Tag?: string | ElementType;
}

const InstanceInitial: FC<InstanceProps> = ({
  Tag = "div",
  style = {},
  FrameElement,
  ...instanceProps
}) => {
  const ssr = instanceProps?.options?.ssr ?? true;
  const {
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
    <Scope
      fragmentManager={innerManager}
      layerKey={instanceProps.layerKey}
      value={{
        type: definition.scopeTypes.InstanceScope,
        props,
        definitions,
        fragmentId,
        layerKey: instanceProps.layerKey,
      }}
    >
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
          <Tag
            className={hash}
            data-key={instanceProps.layerKey}
            style={{ ...style, ...cssProps }}
          >
            <Fragment
              fragmentId={fragmentId}
              globalManager={globalManager}
              FrameElement={FrameElement}
            />
          </Tag>
        ) : (
          <Tag style={{ ...style, ...cssProps }}>
            <Fragment
              fragmentId={fragmentId}
              globalManager={globalManager}
              FrameElement={FrameElement}
            />
          </Tag>
        )}
      </InstanceContext.Provider>
    </Scope>
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
