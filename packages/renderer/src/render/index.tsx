import { render as preactRender } from "preact/compat";
import { Fragment as FragmentNode } from "./Fragment/Fragment";
// import { Layer as LayerNode } from "./Layer/Layer.performance";
import { RendererContext as ContextNode } from "./Context/Context.tsx";
import { extractProps } from "./hocs/exptractProps.tsx";

type RenderTarget = "Fragment" | "Layer";

const renderVNode = (target: RenderTarget, VNode: any) => (options: any) => {
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

    preactRender(
      <ContextNode.Provider
        value={{
          globalContext,
          context,
        }}
      >
        <VNode {...documentNode} />
      </ContextNode.Provider>,
      domTarget
    );
  };

  return {
    render,
  };
};

// Ждём https://github.com/egoist/tsup/issues/905
// export const Fragment = renderVNode("Fragment", extractProps(FragmentNode));
// export const Layer = renderVNode("Layer", extractProps(LayerNode));
