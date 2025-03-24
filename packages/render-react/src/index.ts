import {
  Fragment as BaseFragment,
  Instance as BaseInstance,
} from "@fragments/render-core";
import { createReactComponent } from "@/reactAdapter";
import { useRenderTarget } from "@/hooks/useRenderTarget";
export { GlobalManager } from "@/components/GlobalManager";
export { useGlobalManager } from "@/hooks/useGlobalManager";
export { useFragmentManager } from "@/hooks/useFragmentManager";
export { useFragmentProperties } from "@/hooks/useFragmentProperties";
export { useRenderTarget } from "@/hooks/useRenderTarget";

export const Fragment = createReactComponent(BaseFragment);
export const Instance = createReactComponent(BaseInstance);
