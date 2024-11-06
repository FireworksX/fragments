import { Extender } from "@/types";
import { valueSetter } from "@/shared/valueSetter.ts";
import { renderMode, sizing } from "@/definitions.ts";
import { getDOMTarget } from "@/shared/getDOMTarget.ts";
import { isBrowser } from "@fragments/utils";

export const fragmentSizeExtend: Extender = ({
  graph,
  state,
  graphKey,
  getValue,
}) => {
  const widthSetter = valueSetter(state, graphKey, "width");
  const heightSetter = valueSetter(state, graphKey, "height");
  let detachParentObserver: (() => void) | null = null;

  const initRenderModes = () => {
    const mode = state.resolve(graphKey)?.renderMode;

    if (mode === renderMode.parent) {
      const domTarget = getDOMTarget(graphKey);
      const targetParent = domTarget?.parentElement;

      const parentObserver = new ResizeObserver(([entity]) => {
        const node = state.resolve(graphKey);

        node.setWidth(entity.contentRect.width);
        node.setHeight(entity.contentRect.height);
      });

      if (targetParent) {
        parentObserver.observe(targetParent);
        detachParentObserver = () => parentObserver.unobserve(targetParent);
      }
    }
  };

  if (isBrowser) {
    state.subscribe(graphKey, (nextValue, prevValue) => {
      if (
        nextValue.renderMode !== prevValue?.renderMode ||
        nextValue.renderTarget !== prevValue?.renderTarget
      ) {
        detachParentObserver?.();
        initRenderModes();
      }
    });

    initRenderModes();
  }

  return {
    ...graph,
    width: getValue("width"),
    height: getValue("height"),
    layoutSizingHorizontal: sizing.Fixed,
    layoutSizingVertical: sizing.Fixed,
    setWidth: widthSetter,
    setHeight: heightSetter,
  };
};
