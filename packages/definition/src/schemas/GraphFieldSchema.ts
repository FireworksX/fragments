import * as v from "valibot";
import { nodes } from "@/constants";

export const GraphFieldSchema = v.object({
  _id: v.union([v.string(), v.number()]),
  _type: v.picklist(Object.keys(nodes)),
});
