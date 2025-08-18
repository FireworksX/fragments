import { nodes, variableType } from "@/constants";
import { FrameSchema } from "@/schemas/nodes/FrameSchema";
import { TextSchema } from "@/schemas/nodes/TextSchema";
import { FragmentSchema } from "@/schemas/nodes/FragmentSchema";
import { InstanceSchema } from "@/schemas/nodes/InstanceSchema";
import { NumberVariableSchema } from "@/schemas/variables/NumberVariableSchema";
import { BooleanVariableSchema } from "@/schemas/variables/BooleanVariableSchema";
import { ColorVariableSchema } from "@/schemas/variables/ColorVariableSchema";
import { StringVariableSchema } from "@/schemas/variables/StringVariableSchema";
import { EventVariableSchema } from "@/schemas/variables/EventVariableSchema";
import { LinkVariableSchema } from "@/schemas/variables/LinkVariableSchema";
import { EnumVariableSchema } from "@/schemas/variables/EnumVariableSchema";
import { ObjectVariableSchema } from "@/schemas/variables/ObjectVariableSchema";

export const getLayerSchema = (layer?: unknown) => {
  if (!layer?._type) return null;

  if (layer?._type === nodes.Frame) return FrameSchema;
  if (layer?._type === nodes.Text) return TextSchema;
  if (layer?._type === nodes.Fragment) return FragmentSchema;
  if (layer?._type === nodes.Instance) return InstanceSchema;
  //
  if (layer._type === nodes.Variable) {
    const types = {
      [variableType.Number]: NumberVariableSchema,
      [variableType.Boolean]: BooleanVariableSchema,
      [variableType.String]: StringVariableSchema,
      [variableType.Color]: ColorVariableSchema,
      [variableType.Event]: EventVariableSchema,
      [variableType.Link]: LinkVariableSchema,
      [variableType.Enum]: EnumVariableSchema,
      [variableType.Object]: ObjectVariableSchema,
    };

    if (layer.type in types) {
      return types[layer.type];
    }
  }
};
