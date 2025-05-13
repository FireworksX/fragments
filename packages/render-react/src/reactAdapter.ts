import { reactCSRAdapter } from "@/hocs/reactCSRAdapter.tsx";
import { reactSSRAdapter } from "@/hocs/reactSSRAdapter.tsx";
import { isBrowser } from "@/helpers/isBrowser";

// Обёртка для Preact-компонента
export function createReactComponent(PreactComponent: any) {
  if (!isBrowser) {
    return reactSSRAdapter(PreactComponent);
  }

  return reactCSRAdapter(PreactComponent);
}
