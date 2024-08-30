import { createRoot } from "react-dom/client";
import { Fragment as FragmentNode } from "./Fragment/Fragment.performance";
import { Layer as LayerNode } from "./Layer/Layer.performance";
import { RendererContext as ContextNode } from "./Context/Context.performance";
import { extractProps } from "../hocs/extractProps/exptractProps.performance";

type RenderTarget = "Fragment" | "Layer";

export const renderVNode =
  (target: RenderTarget, VNode: any) => (options: any) => {
    const { globalContext, document } = options ?? {};
    if (!globalContext) {
      throw new Error("GlobalContext is required.");
    }

    const getContext = (target: RenderTarget, document: any) => {
      if (target === "Fragment") {
        return globalContext.createFragmentState(document);
      }
      if (target === "Layer") {
        return globalContext.createAbstractState(document);
      }
    };

    const render = (domTarget: HTMLElement, _props: any) => {
      const context = getContext(target, document);
      const [documentLinkKey] = context.inspectFields("Document");
      const documentNode = context.resolve(documentLinkKey);

      const root = createRoot(domTarget);
      root.render(
        <ContextNode.Provider
          value={{
            globalContext,
            context,
          }}
        >
          <VNode {...documentNode} />
        </ContextNode.Provider>
      );
    };

    return {
      render,
    };
  };

export const Fragment = renderVNode("Fragment", extractProps(FragmentNode));
export const Layer = renderVNode("Layer", extractProps(LayerNode));
