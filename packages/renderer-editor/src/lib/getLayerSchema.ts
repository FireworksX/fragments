import { nodes, variableType } from "@fragments/plugin-fragment";
import { frameSchema } from "@/shared/schemas/frameSchema.ts";
import { textSchema } from "@/shared/schemas/textSchema.ts";
import { fragmentSchema } from "@/shared/schemas/fragmentSchema.ts";
import { booleanVariableSchema } from "@/shared/schemas/variables/booleanVariableSchema.ts";
import { numberVariableSchema } from "@/shared/schemas/variables/numberVariableSchema.ts";
import { stringVariableSchema } from "@/shared/schemas/variables/stringVariableSchema.ts";

export const getLayerSchema = (layer?: unknown) => {
  if (!layer?._type) return null;

  if (layer?._type === nodes.Frame) return frameSchema;
  if (layer?._type === nodes.Text) return textSchema;
  if (layer?._type === nodes.Fragment) return fragmentSchema;

  if (layer._type === nodes.Variable) {
    const types = {
      [variableType.Number]: numberVariableSchema,
      [variableType.Boolean]: booleanVariableSchema,
      [variableType.String]: stringVariableSchema,
    };

    if (layer.type in types) {
      return types[layer.type];
    }
  }
};
