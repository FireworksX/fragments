import { Extender } from "@/types";
import { variableTransforms } from "@/defenitions.ts";
import { noop } from "@fragments/utils";
import { transformValueEqualsExtend } from "@/shared/extends/nodes/transformValueExtend/transformValueEqualsExtend";
import { convertFromBooleanTransformValueExtend } from "@/shared/extends/nodes/transformValueExtend/transformValueConvertFromBooleanExtend";
import { transformValueNegativeExtend } from "@/shared/extends/nodes/transformValueExtend/transformValueNegativeExtend";
import { transformValueStartWithExtend } from "@/shared/extends/nodes/transformValueExtend/transformValueStartWithExtend";
import { transformValueEndWithExtend } from "@/shared/extends/nodes/transformValueExtend/transformValueEndWithExtend";
import { transformValueContainsExtend } from "@/shared/extends/nodes/transformValueExtend/transformValueContainsExtend";
import { transformValueExistsExtend } from "@/shared/extends/nodes/transformValueExtend/transformValueExistsExtend";
import { transformValueValueSizeExtend } from "@/shared/extends/nodes/transformValueExtend/transformValueSizeExtend";

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
