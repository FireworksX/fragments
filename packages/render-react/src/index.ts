import {
  Fragment as BaseFragment,
  Instance as BaseInstance,
} from "@fragments/render-core";
import { createReactComponent } from "@/reactAdapter";
export { GlobalManager } from "@/components/GlobalManager";

export const Fragment = createReactComponent(BaseFragment);
export const Instance = createReactComponent(BaseInstance);
