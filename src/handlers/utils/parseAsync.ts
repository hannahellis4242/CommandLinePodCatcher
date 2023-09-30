import { ZodSchema } from "zod";

const parseAsync =
  <A>(schema: ZodSchema<A>) =>
  <B>(data: B): Promise<A> => {
    const result = schema.safeParse(data);
    if (!result.success) {
      return Promise.reject(new Error(`${result.error.issues}`));
    }
    return Promise.resolve(result.data);
  };
export default parseAsync;
