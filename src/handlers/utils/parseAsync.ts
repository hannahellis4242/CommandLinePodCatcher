import { ZodSchema } from "zod";

const parseAsync =
  <A>(schema: ZodSchema<A>) =>
  <B>(data: B): Promise<A> => {
    const result = schema.safeParse(data);
    if (!result.success) {
      return Promise.reject(
        new Error(`${JSON.stringify(result.error.issues, null, 2)}`)
      );
    }
    return Promise.resolve(result.data);
  };
export default parseAsync;
