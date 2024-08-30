import { FC, useContext } from "react";
import { useGraph } from "@graph-state/react";
import { RendererContext } from "../../render/Context/Context.performance";
import { Graph } from "@graph-state/core";

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
