import { useGraph } from "@graph-state/react";
import { useFragmentManager } from "@/shared/hooks/useFragmentManager";
import { keyOfEntity } from "@graph-state/core";
import { noop } from "@fragmentsx/utils";

export const useFragmentProperties = (fragmentId: string) => {
  const { manager } = useFragmentManager(fragmentId);
  const [instanceFragment] = useGraph(manager, manager?.$fragment?.root);

  return {
    properties: (instanceFragment?.properties ?? [])
      .map(manager?.resolve ?? noop)
      .filter((prop) => !prop?.parent)
      .map(keyOfEntity),
    manager,
  };
};
