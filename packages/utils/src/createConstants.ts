export const createConstants = <K extends string>(...constants: K[]) => {
  return constants.reduce<{ [P in K]: P }>((acc, constant) => {
    acc[constant] = constant
    return acc
  }, {} as { [P in K]: P })
}