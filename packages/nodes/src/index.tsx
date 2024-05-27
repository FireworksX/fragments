import { Layer as LayerNode } from "./Layer.tsx";
import { ComponentChild, render as preactRender, cloneElement } from "preact";
import GraphStateProvider from "./GraphStateProvider.tsx";

const renderNode =
  (vNode: ComponentChild) => (domTarget: HTMLElement, props) => {
    if (!props.graphState)
      throw new Error("Cant render Node without graphState");

    return preactRender(
      <GraphStateProvider graphState={props.graphState}>
        {cloneElement(vNode, props)}
      </GraphStateProvider>,
      domTarget
    );
  };

export const Layer = renderNode(<LayerNode />);
