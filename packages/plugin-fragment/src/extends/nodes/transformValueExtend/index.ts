import { Extender } from "@/types";
import { variableTransforms } from "@/definitions.ts";
import { noop } from "@fragments/utils";
import { transformValueEqualsExtend } from "@/extends/nodes/transformValueExtend/transformValueEqualsExtend";
import { convertFromBooleanTransformValueExtend } from "@/extends/nodes/transformValueExtend/transformValueConvertFromBooleanExtend";
import { transformValueNegativeExtend } from "@/extends/nodes/transformValueExtend/transformValueNegativeExtend";
import { transformValueStartWithExtend } from "@/extends/nodes/transformValueExtend/transformValueStartWithExtend";
import { transformValueEndWithExtend } from "@/extends/nodes/transformValueExtend/transformValueEndWithExtend";
import { transformValueContainsExtend } from "@/extends/nodes/transformValueExtend/transformValueContainsExtend";
import { transformValueExistsExtend } from "@/extends/nodes/transformValueExtend/transformValueExistsExtend";
import { transformValueValueSizeExtend } from "@/extends/nodes/transformValueExtend/transformValueSizeExtend";

export const transformValueExtend: Extender = (payload): unknown => {
  const variableType = payload.graph?.name;

  const extender =
    {
      [variableTransforms.equals]: transformValueEqualsExtend,
      [variableTransforms.convertFromBoolean]:
        convertFromBooleanTransformValueExtend,
      [variableTransforms.negative]: transformValueNegativeExtend,
      [variableTransforms.startWith]: transformValueStartWithExtend,
      [variableTransforms.endWith]: transformValueEndWithExtend,
      [variableTransforms.contains]: transformValueContainsExtend,
      [variableTransforms.exists]: transformValueExistsExtend,
      [variableTransforms.gt]: transformValueValueSizeExtend("gt"),
      [variableTransforms.gte]: transformValueValueSizeExtend("gte"),
      [variableTransforms.lt]: transformValueValueSizeExtend("lt"),
      [variableTransforms.lte]: transformValueValueSizeExtend("lte"),
    }[variableType] || noop;

  console.log(payload, extender);
  return extender(payload);
};
