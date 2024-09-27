export const animatableValue = <T>(value: T): T => {
  if (typeof value?.get === "function") {
    return value.get();
  }

  return value;
};
