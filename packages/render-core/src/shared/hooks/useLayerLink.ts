import { useLayerValue } from "@/shared/hooks/useLayerValue";
import { useGlobalManager } from "@/shared/hooks/useGlobalManager";
import { useContext, useMemo } from "preact/compat";
import { FragmentContext } from "@/components/Fragment/FragmentContext";
import { isValue } from "@fragmentsx/utils";

export const useLayerLink = (layerKey) => {
  const { manager: fragmentManager } = useContext(FragmentContext);

  const [href] = useLayerValue(layerKey, "href", fragmentManager);
  const [hrefNewTab] = useLayerValue(layerKey, "hrefNewTab", fragmentManager);
  const isLink = isValue(href) && typeof href === "string" && !!href?.length;
  const linkTarget = hrefNewTab ? "_blank" : "";

  const linkProps = useMemo(() => {
    if (isLink) {
      return {
        target: linkTarget,
        href: href,
      };
    }

    return {};
  }, [linkTarget, href, isLink]);

  return {
    isLink,
    linkHref: href,
    linkTarget: hrefNewTab ? "_blank" : "",
    linkProps,
  };
};
