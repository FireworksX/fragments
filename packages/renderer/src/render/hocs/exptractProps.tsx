import { FC, useContext } from "preact/compat";
import { useGraph } from "@graph-state/react";
import { Graph } from "@graph-state/core";
import { RendererContext } from "../Context/Context.tsx";

export const extractProps = (Comp: FC) => {
  return (props: Graph) => {
    const { context } = useContext(RendererContext);
    const [node] = useGraph(context, props);
    const children = node?.children?.map?.(context.resolve) ?? [];
    const resultNode = {
      ...node,
      children,
    };

    return <Comp {...resultNode} />;
  };
};
