import { FragmentProvider } from "./FragmentContext.tsx";
import { GraphState, LinkKey } from "@graph-state/core";
import { FC } from "react";
import { useLayerChildren } from "@/shared/hooks/useLayerChildren.ts";
import { Frame } from "@/components/Frame";

interface FragmentProps {
  layerKey: LinkKey;
  manager: GraphState;
  startLayer?: LinkKey;
}

export const Fragment: FC<FragmentProps> = ({
  manager,
  layerKey,
  startLayer,
}) => {
  if (!manager) {
    throw new Error("Cannot render Fragment without manager");
  }

  const children = useLayerChildren(layerKey, manager);

  return (
    <FragmentProvider manager={manager}>
      {children.map((childLink) => (
        <Frame key={childLink} layerKey={childLink} />
      ))}
    </FragmentProvider>
  );
};
