import { FC } from "react";
import { definition } from "@fragmentsx/definition";
import { LinkKey } from "@graph-state/core";
import { useFragment } from "./hooks/useFragment";
import { FragmentProvider } from "./FragmentContext";
import styles from "./styles.module.css";
import { Frame } from "@/components/Frame";

interface FragmentProps {
  fragmentId: string;
  startLayer?: LinkKey;
}

export const Fragment: FC<FragmentProps> = ({ fragmentId }) => {
  const { ref, children, manager, isDocument } = useFragment(fragmentId);

  return (
    <FragmentProvider manager={manager}>
      <div
        // ref={ref}
        data-key={`${definition.nodes.Fragment}:${fragmentId}`}
        className={isDocument ? styles.fragmentDocument : styles.fragment}
        style={styles}
      >
        {children.map((childLink) => (
          <Frame key={childLink} layerKey={childLink} />
        ))}
      </div>
    </FragmentProvider>
  );
};
