import * as R from "ramda"
import { ReadonlyURLSearchParams } from "next/navigation"

export const isBrowserWindow = typeof window !== "undefined"

export const checkPath = (pathname: string): string => {
  switch (true) {
    case /\/questions($|\?)/.test(pathname):
      return "questions"
    case /\/chat/.test(pathname):
      return "chat"
    case /\/resources/.test(pathname):
      return "resources"
    case /\/login/.test(pathname):
      return "login"
    default:
      return "Path does not match"
  }
}

export const sleep = (milliseconds: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, milliseconds))

export type H<T extends (...args: any[]) => any, K extends keyof ReturnType<T>> = ReturnType<T>[K]

interface Parameters {
  [key: string]: string | number | boolean | any[] | Record<string, any>;
}
const obj: Parameters = {
  range: [0, 5],
  filter: { category: "teen" },
  sort: ["title", "DESC"]
};

export const encodeParams = (obj: Parameters) => Object.keys(obj).map(key => {
  const encodedKey = encodeURIComponent(key)
  const encodedValue = encodeURIComponent(JSON.stringify(obj[key]))
  return `${encodedKey}=${encodedValue}`;
}).join('&');

const getCurrentParams = R.pipe<any, Record<string, string>>((params) => {
  let object = {}
  params.forEach((value: string, key: string) => {
    object = { ...object, [key]: value }
  })
  return object
})

export const setParams = (
  currentParams: ReadonlyURLSearchParams,
  params: Record<string, string>,
  toggle: boolean = true
): string => {
  const noneParamsExist = currentParams.size === 0
  if (noneParamsExist) {
    const result = `?${new URLSearchParams(params)}`
    return result
  } else {
    const current = getCurrentParams(currentParams)
    let mergedParams = R.mergeAll([current, params])
    if (toggle) {
      const firstToggleParms = R.pipe<any, any, [string, string]>(R.toPairs, R.head)(params)
      if (current[firstToggleParms[0]] === firstToggleParms[1]) {
        delete mergedParams[firstToggleParms[0]]
        return `?${new URLSearchParams(mergedParams)}`
      } else {
        return `?${new URLSearchParams(mergedParams)}`
      }
    } else {
      return `?${new URLSearchParams(mergedParams)}`
    }
  }
}

export const matchParams = (
  searchParams: ReadonlyURLSearchParams,
  attr: string,
  value: string,
  defaultValue: string
) => {
  const isParam = searchParams.get(attr.toLocaleLowerCase()) !== null
  const defaultMatch = defaultValue?.toLocaleLowerCase() === value?.toLocaleLowerCase()
  if (isParam) {
    return searchParams.get(attr.toLocaleLowerCase()) === value?.toLocaleLowerCase()
  } else {
    return defaultMatch
  }
}