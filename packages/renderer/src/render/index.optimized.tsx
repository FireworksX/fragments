import "preact/debug";
import { ComponentChild, render as preactRender, cloneElement } from "preact";
import { Fragment as FragmentNode } from "./Fragment/Fragment.optimized";

const renderNode = (vNode: any) => (domTarget: HTMLElement, props) => {
  return preactRender(cloneElement(vNode, props), domTarget);
};

export const Fragment = renderNode(<FragmentNode />);
