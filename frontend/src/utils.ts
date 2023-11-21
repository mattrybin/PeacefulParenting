import * as R from "ramda"

export const propExist = (array: object[], property: string, value: string) => {
  return array.some(obj => R.prop(property)(obj) === value);
}