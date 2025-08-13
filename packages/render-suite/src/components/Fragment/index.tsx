import { LinkKey } from "@graph-state/core";
import { Frame } from "@/components/Frame";
import { Fragment as FragmentCore } from "@fragmentsx/render-react";
import {
  GlobalManager,
  FragmentContext,
  useFragmentManager,
} from "@fragmentsx/render-core";
import { useContext } from "react";

interface FragmentProps {
  fragmentId: string;
  startLayer?: LinkKey;
}

export const Fragment = (props) => {
  const currentGlobalManager = useContext(GlobalManager);
  const { manager } = useFragmentManager(
    props.fragmentId,
    currentGlobalManager
  );

  return (
    <FragmentContext.Provider value={{ manager }}>
      <FragmentCore
        {...props}
        globalManager={currentGlobalManager}
        FrameElement={Frame}
      />
    </FragmentContext.Provider>
  );
};
