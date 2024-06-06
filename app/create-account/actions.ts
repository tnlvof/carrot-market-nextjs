import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "@/lib/constants";
("use server");
import { z } from "zod";

const formSchmea = z
  .object({
    username: z.string().min(3, "너무 짧아!").max(10, "너무 길어!"),
    email: z.string().email().toLowerCase().trim(),
    password: z
      .string()
      .min(PASSWORD_MIN_LENGTH)
      .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    confirm_password: z.string().min(PASSWORD_MIN_LENGTH),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "비밀번호가 일치하지 않아!",
    path: ["confirm_password"],
  });

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  };
  const result = formSchmea.safeParse(data);
  if (!result.success) {
    return result.error?.flatten();
  }
}
