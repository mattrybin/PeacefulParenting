
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
