import { definition } from "@fragmentsx/definition";
import { useCallback, useContext, useMemo } from "preact/compat";
import { FragmentContext } from "@/components/Fragment/FragmentContext";
import { useLayerValue } from "@/shared/hooks/useLayerValue";
import { LinkKey } from "@graph-state/core";
import { useReadVariable } from "@/shared/hooks/useReadVariable";
import { useGlobalManager } from "@/shared/hooks/useGlobalManager";

export const useLayerInteractions = (layerKey) => {
  const { manager: globalManager } = useGlobalManager();
  const { manager: fragmentManager } = useContext(FragmentContext);
  const [interactions] = useLayerValue(
    layerKey,
    "interactions",
    fragmentManager
  );

  const { readVariable } = useReadVariable();

  const fireEvent = useCallback(
    (eventLink: LinkKey) => {
      const event = fragmentManager.resolve(eventLink);
      const { value: eventValue } = readVariable(eventLink);

      if (event?.mode === definition.eventMode.goal) {
        globalManager?.$metrics?.reachGoal?.(eventValue?.code);
      }
    },
    [globalManager, fragmentManager]
  );

  return useMemo(() => {
    if (!interactions || !Array.isArray(interactions)) return {};

    const clickEvents = interactions
      ?.filter((el) => el?.on === definition.interactions.click)
      .map((el) => el.event);

    return {
      onClick: () => {
        clickEvents.map(fireEvent);
      },
    };
  }, [interactions, fireEvent]);
};
