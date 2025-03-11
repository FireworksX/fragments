import { FC, useContext, useState } from "preact/compat";
import { useFragment } from "@/components/Fragment/hooks/useFragment";
import { FragmentProvider } from "@/components/Fragment/FragmentContext";
import { nodes } from "@/definitions";
import styles from "./styles.module.css";
import { LinkKey } from "@graph-state/core";
import { Frame } from "@/components/Frame";

interface FragmentProps {
  globalContext?: unknown;
  fragmentId: string;
  startLayer?: LinkKey;
}

export const Fragment: FC<FragmentProps> = ({ fragmentId, globalContext }) => {
  const { ref, children, manager } = useFragment(fragmentId, globalContext);

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
