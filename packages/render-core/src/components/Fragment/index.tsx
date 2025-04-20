import { FC, useContext, useState } from "preact/compat";
import { useFragment } from "@/components/Fragment/hooks/useFragment";
import { FragmentProvider } from "@/components/Fragment/FragmentContext";
import styles from "./styles.module.css";
import { LinkKey } from "@graph-state/core";
import { Frame } from "@/components/Frame";
import { GlobalManager } from "@/components/GlobalManager";
import { useGlobalManager } from "@/shared/hooks/useGlobalManager";
import { definition } from "@fragmentsx/definition";

interface FragmentProps {
  globalManager?: unknown;
  fragmentId: string;
  startLayer?: LinkKey;
}

export const Fragment: FC<FragmentProps> = ({ fragmentId, globalManager }) => {
  const { manager: resultGlobalManager } = useGlobalManager(globalManager);
  const { setRef, children, manager, isDocument } = useFragment(
    fragmentId,
    globalManager
  );

  return (
    <GlobalManager value={resultGlobalManager}>
      <FragmentProvider manager={manager}>
        <div
          ref={setRef}
          data-key={`${definition.nodes.Fragment}:${fragmentId}`}
          // className={isDocument ? styles.fragmentDocument : styles.fragment}
          className={styles.fragment}
        >
          {children.map((childLink) => (
            <Frame key={childLink} layerKey={childLink} />
          ))}
        </div>
      </FragmentProvider>
    </GlobalManager>
  );
};
