import * as R from "ramda";
import { useQuery } from "@tanstack/react-query";
import { ZodType, z } from "zod";
import { requestV1 } from "shared/instances";
import { encodeParams } from "shared/utils";

const useQuestionsQuerySchema = z.array(
  z.object({
    id: z.string(),
    title: z.string(),
    voteCount: z.number(),
    answerCount: z.number(),
    viewCount: z.number(),
    createdAt: z.coerce.date(),
    category: z.string(),
    user: z
      .object({
        image: z.string(),
        username: z.string(),
      })
      .default({
        image: "https://i.pravatar.cc/150?img=3",
        username: "Matt Rybin",
      }),
  })
);

const parseQuery = <T,>(schema: ZodType<T>) => {
  return (data: any) => {
    const result = schema.safeParse(data);

    if (!result.success) {
      console.error(result.error);
      throw new Error(JSON.stringify(result.error));
    } else {
      return result.data;
    }
  };
};

export const useQuestionsQuery = ({
  category = "",
  perPage,
  page,
  sort = "top",
}: {
  category: string | undefined;
  page: number;
  perPage: number;
  sort: string;
}) => {
  const sortSelector = R.cond([
    [R.equals("new"), R.always(["createdAt", "DESC"])],
    [R.equals("top"), R.always(["viewCount", "DESC"])],
    [R.T, R.always(["createdAt", "DESC"])],
  ]);
  const range = [perPage * page - perPage, perPage * page - 1];
  const obj = {
    range,
    filter: { category: category ?? "" },
    sort: sortSelector(sort),
  };

  return useQuery({
    queryKey: ["questions", obj],
    queryFn: async () => {
      try {
        const response = await requestV1("questions" + "?" + encodeParams(obj));
        const data = await response.json();
        return {
          count: response.headers.get("X-Total-Count"),
          response: parseQuery(useQuestionsQuerySchema)(data),
        };
      } catch (err) {
        console.error("ERROR", err);
      }
    },
  });
};
