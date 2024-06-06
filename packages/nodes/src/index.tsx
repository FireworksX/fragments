import { Layer as LayerNode } from "./Layer.tsx";
import { Component as ComponentNode } from "./Component.tsx";
import { ComponentInstance as ComponentInstanceNode } from "./ComponentInstance.tsx";
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
export const Component = renderNode(<ComponentNode />);
export const ComponentInstance = renderNode(<ComponentInstanceNode />);
