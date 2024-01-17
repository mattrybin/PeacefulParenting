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

    return (
      method(opts.url, input)
        // Imagine error handling here...
        .then((res) => res.json())
    );
  };