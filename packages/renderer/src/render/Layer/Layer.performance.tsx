import { FC } from "react";

interface LayerProps {}

export const Layer: FC<LayerProps> = (props) => {
  console.log("Layer Props", props);

  return <h2>Layer</h2>;
};
