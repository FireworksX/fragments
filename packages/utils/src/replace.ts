import { AnyObject } from "../types";

export const replace = (text: string, variables?: AnyObject): string => {
  if (text && typeof text === 'string' && variables) {
    const vars = Object.keys(variables)
    return vars.reduce((resultText, variable) => {
      const value = variables[variable]
      const formatVar = typeof value === 'string' ? value.replace(/^\s|"/gi, '') : value
      const regexp = new RegExp(`{${variable}}`, 'g')
      return resultText.replace(regexp, formatVar ?? '')
    }, text)
  }
  return text
}
