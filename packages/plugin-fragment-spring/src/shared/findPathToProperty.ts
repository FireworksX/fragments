import { isObject } from "@fragments/utils";
import { nodes, variableType } from "@fragments/plugin-fragment";

export const findPathToProperty = (input, targetId: string, path = "") => {
  if (Array.isArray(input)) {
    for (let i = 0; i < input.length; i++) {
      const result = findPathToProperty(
        input[i],
        targetId,
        path.length === 0 ? input[i]._id : `${path}.${input[i]._id}`
      );
      if (result) return result; // нашли объект, возвращаем путь
    }
  }
  // Если data — объект, проверяем, есть ли у него _id
  else if (isObject(input)) {
    if (input._type === nodes.Variable) {
      if (input._id === targetId) {
        return {
          path,
          property: input,
        }; // найден объект, возвращаем путь
      }

      if (input.type === variableType.Object) {
        let findEntity = null;
        Object.entries(input.fields).forEach(([key, value]) => {
          const find = findPathToProperty(value, targetId, `${path}.${key}`);
          if (find) {
            findEntity = find;
          }
        });

        return findEntity;
      }
    }
  }

  return null;
};
