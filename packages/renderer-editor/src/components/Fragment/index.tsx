import { FragmentProvider } from "./FragmentContext.tsx";
import { GraphState, LinkKey } from "@graph-state/core";
import { FC } from "react";
import { Frame } from "@/components/Frame";
import { useFragment } from "@/components/Fragment/hooks/useFragment.ts";

interface FragmentProps {
  fragmentId: string;
  startLayer?: LinkKey;
}

export const Fragment: FC<FragmentProps> = ({ fragmentId }) => {
  const { ref, children, manager } = useFragment(fragmentId);

  return (
    <FragmentProvider manager={manager}>
      <div ref={ref} data-key={fragmentId}>
        {children.map((childLink) => (
          <Frame key={childLink} layerKey={childLink} />
        ))}
      </div>
    </FragmentProvider>
  );
};
