import { useLayerValue } from "@/shared/hooks/useLayerValue";
import { useGlobalManager } from "@/shared/hooks/useGlobalManager";
import { useContext } from "preact/compat";
import { FragmentContext } from "@/components/Fragment/FragmentContext";
import { isValue } from "@fragmentsx/utils";

export const useLayerLink = (layerKey) => {
  const { manager: fragmentManager } = useContext(FragmentContext);

  const [href] = useLayerValue(layerKey, "href", fragmentManager);
  const [hrefTarget] = useLayerValue(layerKey, "hrefTarget", fragmentManager);

  return {
    isLink: isValue(href),
    linkHref: href,
    linkTarget: hrefTarget,
  };
};
