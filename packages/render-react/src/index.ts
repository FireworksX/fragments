// import {
//   Fragment as BaseFragment,
//   Instance as BaseInstance,
// } from "@fragmentsx/render-core";
import { createReactComponent } from "@/reactAdapter";
// export { GlobalManager } from "@/components/GlobalManager";
// export { useGlobalManager } from "@/hooks/useGlobalManager";
// export { useFragmentManager } from "@/hooks/useFragmentManager";
// export { useFragmentProperties } from "@/hooks/useFragmentProperties";
// export { useRenderTarget } from "@/hooks/useRenderTarget";

// export const Fragment = createReactComponent(BaseFragment);
// export const Instance = createReactComponent(BaseInstance);

export { collectStyles } from "@/helpers/collectStyles";
export { Instance } from "@/components/Instance";
export { Area } from "@/components/Area";

export { GlobalManager } from "@/components/GlobalManager";

export { useGlobalManager } from "@fragmentsx/render-core";
