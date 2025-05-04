import {
  InstanceContext,
  useFragment as useFragmentCore,
} from "@fragmentsx/render-core";
import { useContext } from "react";

export const useFragment = (fragmentId: string) => {
  const { layerKey } = useContext(InstanceContext);
  const coreProps = useFragmentCore(fragmentId);

  return {
    ...coreProps,
    isTopFragment: !layerKey,
  };
};
