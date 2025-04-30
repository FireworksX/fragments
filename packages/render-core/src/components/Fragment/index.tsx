import { FC, useContext, useState } from "preact/compat";
import { useFragment } from "@/components/Fragment/hooks/useFragment";
import {
  FragmentContext,
  FragmentProvider,
} from "@/components/Fragment/FragmentContext";
import styles from "./styles.module.css";
import { LinkKey } from "@graph-state/core";
import { Frame } from "@/components/Frame";
import { GlobalManager } from "@/providers/GlobalManager";
import { useGlobalManager } from "@/shared/hooks/useGlobalManager";
import { definition } from "@fragmentsx/definition";
import { StyleSheetProvider } from "@/providers/StyleSheetProvider";
import { useFragmentManager } from "@/shared/hooks/useFragmentManager";

interface FragmentProps {
  globalManager?: unknown;
  fragmentId: string;
  startLayer?: LinkKey;
}

const FragmentInternal: FC<FragmentProps> = ({ fragmentId, globalManager }) => {
  const { manager: resultGlobalManager } = useGlobalManager(globalManager);
  const { setRef, children, manager, hash } = useFragment(
    fragmentId,
    globalManager
  );

  return (
    <GlobalManager value={resultGlobalManager}>
      <FragmentContext.Provider value={manager}>
        <div
          ref={setRef}
          data-key={`${definition.nodes.Fragment}:${fragmentId}`}
          // className={isDocument ? styles.fragmentDocument : styles.fragment}
          className={`${styles.fragment} ${hash}`}
        >
          {children.map((childLink) => (
            <Frame key={childLink} layerKey={childLink} />
          ))}
        </div>
      </FragmentContext.Provider>
    </GlobalManager>
  );
};

export const Fragment = (props) => {
  const { manager: resultGlobalManager } = useGlobalManager();
  const { manager } = useFragmentManager(props.fragmentId, resultGlobalManager);

  return (
    <StyleSheetProvider value={manager.styleSheetCache}>
      <FragmentInternal {...props} />
    </StyleSheetProvider>
  );
};
