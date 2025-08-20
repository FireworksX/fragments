import { LinkKey } from "@graph-state/core";
import { definition } from "@fragmentsx/definition";
import { Frame } from "@/components/Frame";
import { Fragment as FragmentCore, Scope } from "@fragmentsx/render-react";

interface FragmentProps {
  fragmentId: string;
  startLayer?: LinkKey;
}

export const Fragment = (props) => {
  return <FragmentCore {...props} FrameElement={Frame} />;
};
