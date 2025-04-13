import {
  useRenderTarget,
  useFragmentManager,
  useFragmentChildren,
} from "@fragmentsx/render-core";

export const useFragment = (fragmentId: string) => {
  const { manager } = useFragmentManager(fragmentId);
  const { isDocument } = useRenderTarget();

  const { setRef, children } = useFragmentChildren(fragmentId);

  return {
    setRef,
    isDocument,
    manager,
    children,
  };
};
