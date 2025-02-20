import { FragmentProvider } from "./FragmentContext.tsx";
import { GraphState, LinkKey } from "@graph-state/core";
import { FC } from "react";
import { Frame } from "@/components/Frame";
import { useFragment } from "@/components/Fragment/hooks/useFragment.ts";

interface FragmentProps {
  layerKey: LinkKey;
  manager: GraphState;
  startLayer?: LinkKey;
}

export const Fragment: FC<FragmentProps> = ({ manager, layerKey }) => {
  if (!manager) {
    throw new Error("Cannot render Fragment without manager");
  }

  const { ref, children } = useFragment(manager, layerKey);

  return (
    <FragmentProvider manager={manager}>
      <div ref={ref} data-key={layerKey}>
        {children.map((childLink) => (
          <Frame key={childLink} layerKey={childLink} />
        ))}
      </div>
    </FragmentProvider>
  );
};
