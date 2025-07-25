import {
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "preact/compat";
import { definition } from "@fragmentsx/definition";
import { InstanceContext } from "@/components/Instance";
import { useFragmentManager } from "@/shared/hooks/useFragmentManager";
import { useLayerChildren } from "@/shared/hooks/useLayerChildren";
import { useRenderTarget } from "@/shared/hooks/useRenderTarget";
import { findBreakpoint } from "@/shared/helpers/findBreakpoint";
import { LinkKey } from "@graph-state/core";
import { useGlobalManager } from "@/shared/hooks/useGlobalManager";
import { useStyleSheet } from "@/shared/hooks/useStyleSheet";
import { isBrowser } from "@fragmentsx/utils";

export const useFragmentChildren = (fragmentId: number) => {
  const { layerKey: instanceLayerKey } = useContext(InstanceContext);
  const { manager, fragmentLayerKey } = useFragmentManager(fragmentId);
  const children = useLayerChildren(fragmentLayerKey, manager);
  const { isDocument, renderTarget } = useRenderTarget();
  const [resizeChildren, setResizeChildren] = useState<LinkKey | null>(null);

  const observerRef = useRef<ResizeObserver>();

  const setRef = useCallback(
    (node: HTMLElement) => {
      // if ((isDocument || instanceLayerKey) && manager) {
      //   if (node) {
      //     const observer = new ResizeObserver(([entity]) => {
      //       const breakpoints = children?.map(manager.resolve);
      //       const activeBreakpoint = findBreakpoint(
      //         breakpoints,
      //         entity.contentRect.width
      //       );
      //
      //       const resizeChildren = activeBreakpoint
      //         ? [manager.keyOfEntity(activeBreakpoint)]
      //         : [];
      //
      //       // console.log(children, layerKey, manager);
      //       if (activeBreakpoint) {
      //         setResizeChildren(manager.keyOfEntity(activeBreakpoint));
      //       }
      //       setResizeChildren(resizeChildren);
      //     });
      //
      //     observer.observe(node);
      //     observerRef.current = observer;
      //   } else {
      //     observerRef.current?.disconnect();
      //     setResizeChildren(null);
      //   }
      // }
    },
    [isDocument, instanceLayerKey, manager, children]
  );

  const primary = children?.find(
    (breakpoint) => manager.resolve(breakpoint)?.isPrimary
  );

  // const resultChildren = useMemo(() => {
  //   if ((isDocument || instanceLayerKey) && manager) {
  //     const breakpoints = children?.map(manager.resolve);
  //     const activeBreakpoint = findBreakpoint(breakpoints, fragmentRect.width);
  //     if (fragmentId === 11) {
  //       console.log(fragmentId, activeBreakpoint, fragmentRect.width);
  //     }
  //     return activeBreakpoint ? [manager.keyOfEntity(activeBreakpoint)] : [];
  //   }
  //
  //   return children;
  // }, [children, manager, resizeChildren]);

  return {
    primary,
    children: children, //isBrowser && resizeChildren ? resizeChildren : children, //isStyleSheetRender ? children ?? [] : primary ? [primary] : [],
    isResize: isBrowser && resizeChildren,
    setRef,
  };
};
