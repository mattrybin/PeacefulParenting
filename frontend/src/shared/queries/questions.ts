export const get = async (
  url: string,
  input: Record<string, string>
) => {
  return fetch(
    `${url}?${new URLSearchParams(input).toString()}`
  );
};

export const post = async (
  url: string,
  input: Record<string, string>
) => {
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(input),
  });
};

type CreateAPIMethod = <
  TInput extends Record<string, string>,
  TOutput
>(opts: {
  url: string;
  method: "GET" | "POST";
}) => (input: TInput) => Promise<TOutput>;

export const createAPIMethod: CreateAPIMethod =
  (opts) => (input) => {
    const method = opts.method === "GET" ? get : post;

    return (method(opts.url, input)
      .then(async response => {
        const data = await response.json()
        if (Array.isArray(data)) {
          const count = response.headers.get("X-Total-Count")
          console.assert(typeof count === "string", "warning: expected count to be string")
          return { count: parseInt(count ?? "0"), data }
        } else {
          return data
        }
      }));
  };

// export const getQuestions = createAPIMethod<
//   {},
//   { count: number, data: [{ name: string }] }
// >({
//   method: "GET",
//   url: "http://backend:4100/api/v1/questions",
// });

export const getQuestions = async () => {
  const response = await fetch("http://backend:4100/api/v1/questions")
  const count = response.headers.get("X-Total-Count")
  const data = await response.json()
  return {count: count, data: data}
}