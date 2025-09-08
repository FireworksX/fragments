import { useContext } from "preact/compat";
import { definition } from "@fragmentsx/definition";
import { LinkKey } from "@graph-state/core";
import { useLayerValue } from "@/shared/hooks/useLayerValue";
import { useLayerSize } from "@/shared/hooks/useLayerStyles/useLayerSize";
import { useLayerPosition } from "@/shared/hooks/useLayerStyles/useLayerPosition";
import { useLayerBackground } from "@/shared/hooks/useLayerStyles/useLayerBackground";
import { useLayerDisplay } from "@/shared/hooks/useLayerStyles/useLayerDisplay";
import { useLayerBorder } from "@/shared/hooks/useLayerStyles/useLayerBorder";
import { useLayerLayout } from "@/shared/hooks/useLayerStyles/useLayerLayout";
import { FragmentContext } from "@/components/Fragment/FragmentContext";
import { omit, pick, toPx } from "@fragmentsx/utils";
import { useInstanceDefinition } from "@/shared/hooks/useInstanceDefinition";
import {
  useReadVariable,
  useReadVariables,
} from "@/shared/hooks/useReadVariables";
import { useGraph } from "@graph-state/react";
import { useLayerTextStyles } from "@/shared/hooks/useLayerStyles/useLayerTextStyles";
import { isVariableLink } from "@/shared/helpers/checks";
import { InstanceContext } from "@/components/Instance";
import { useLayerCssOverride } from "@/shared/hooks/useLayerStyles/useLayerCssOverride";

export const useLayerStyles = (layerKey: LinkKey) => {
  try {
    if (!layerKey) {
      throw new Error("Empty layer key");
    }
    const { manager: fragmentManager } = useContext(FragmentContext);
    const [opacity] = useLayerValue(layerKey, "opacity", fragmentManager);
    const layerSize = useLayerSize(layerKey);
    const { position, top, left } = useLayerPosition(layerKey);
    const display = useLayerDisplay(layerKey);
    const background = useLayerBackground(layerKey);
    const border = useLayerBorder(layerKey);
    const layout = useLayerLayout(layerKey);
    const [zIndex] = useLayerValue(layerKey, "zIndex", fragmentManager);
    const [borderRadius] = useLayerValue(
      layerKey,
      "borderRadius",
      fragmentManager
    );
    const [whiteSpace] = useLayerValue(layerKey, "whiteSpace", fragmentManager);
    const textStyles = useLayerTextStyles(layerKey);
    // const cssOverride = useLayerCssOverride(layerKey);

    // const [{ props, _type }] = useGraph(fragmentManager, layerKey, {
    //   selector: (graph) => pick(graph, "props", "_type"),
    // });
    //
    // console.log(layerKey, fragmentManager.resolve(layerKey)?.props);
    //
    // const resolvedProps = useReadVariables(
    //   _type === definition.nodes.Instance
    //     ? Object.keys(omit(props ?? {}, "_id", "_type")).map(
    //         (variableKey) => `${definition.nodes.Variable}:${variableKey}`
    //       )
    //     : []
    // );

    // let props = {};
    // const { _type } = fragmentManager.entityOfKey(layerKey) ?? {};
    // if (_type === definition.nodes.Instance) {
    //   const instanceProps = omit(
    //     fragmentManager?.resolve(layerKey)?.props,
    //     "_id",
    //     "_type"
    //   );
    //
    //   props = Object.entries(instanceProps).reduce((acc, [key, value]) => {
    //     if (isVariableLink(value)) {
    //       const nestedVariableId = fragmentManager?.entityOfKey?.(value)?._id;
    //       value = `var(--${nestedVariableId})`;
    //     }
    //
    //     acc[`--${key}`] = value;
    //     return acc;
    //   }, {});
    // }

    // console.log(layerKey, props, fragmentManager?.resolve(layerKey));

    return {
      // ...(props ?? {}),
      ...border,
      ...background,
      position,
      top,
      left,
      opacity,
      "border-radius": borderRadius,
      "white-space": whiteSpace,
      "z-index": zIndex !== -1 ? zIndex : null,
      ...layout,
      ...layerSize,
      ...textStyles,
      display,
      "user-select": "none",
      // ...cssOverride,
    };
  } catch (e) {
    // console.debug(e);
    return {};
  }
};
