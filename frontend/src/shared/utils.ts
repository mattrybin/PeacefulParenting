
export const checkPath = (pathname: string): string => {
  switch (true) {
    case /\/questions/.test(pathname):
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