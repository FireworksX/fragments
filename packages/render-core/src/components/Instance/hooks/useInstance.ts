import { useContext, useMemo } from "preact/compat";
import { FragmentContext } from "@/components/Fragment/FragmentContext.tsx";
import { useLayerStyles } from "@/shared/hooks/useLayerStyles";
import { useGraph } from "@graph-state/react";
import { InstanceProps } from "@/components/Instance";
import { useFragmentProperties } from "@/shared/hooks/useFragmentProperties.ts";
import { useGlobalManager } from "@/shared/hooks/useGlobalManager";
import { useHash } from "@/shared/hooks/useHash";
import { omit } from "@fragmentsx/utils";
import { useInstanceProps } from "@/components/Instance/hooks/useInstanceProps";
import { useLayerLink } from "@/shared/hooks/useLayerLink";

export const useInstance = (instanceProps: InstanceProps) => {
  const { manager: parentManager } = useContext(FragmentContext);
  const [instanceLayer] = useGraph(parentManager, instanceProps.layerKey);
  const styles = useLayerStyles(instanceProps.layerKey);

  const { manager: resultGlobalManager } = useGlobalManager(
    instanceProps?.globalManager
  );

  const resultFragmentId = instanceProps?.fragmentId ?? instanceLayer?.fragment;
  const { properties: definitions, manager: innerFragmentManager } =
    useFragmentProperties(resultFragmentId);

  console.log(instanceProps, innerFragmentManager);
  const { props, cssProps } = useInstanceProps(instanceProps);

  // // useInstanceProperties(fragmentManager, layerKey);
  //
  // return {
  //   manager: fragmentManager,
  //   styles,
  //   fragmentId: instanceLayer?.fragment,
  // };

  const hash = useHash(instanceProps.layerKey, innerFragmentManager);

  return {
    hash,
    styles,
    definitions,
    props,
    cssProps,
    parentManager,
    innerManager: innerFragmentManager,
    fragmentId: resultFragmentId,
    globalManager: resultGlobalManager,
  };
};
