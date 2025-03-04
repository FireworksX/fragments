import { FC } from "react";
import { FragmentProvider } from "./FragmentContext.tsx";
import { GraphState, LinkKey } from "@graph-state/core";
import { nodes } from "@fragments/plugin-fragment";
import { Frame } from "@/components/Frame";
import { useFragment } from "./hooks/useFragment.ts";
import styles from "./styles.module.css";

interface FragmentProps {
  fragmentId: string;
  startLayer?: LinkKey;
}

export const Fragment: FC<FragmentProps> = ({ fragmentId }) => {
  const { ref, children, manager } = useFragment(fragmentId);

  return (
    <FragmentProvider manager={manager}>
      <div
        ref={ref}
        data-key={`${nodes.Fragment}:${fragmentId}`}
        className={styles.fragment}
      >
        {children.map((childLink) => (
          <Frame key={childLink} layerKey={childLink} />
        ))}
      </div>
    </FragmentProvider>
  );
};
