"use server";

import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "@/lib/constants";
import db from "@/lib/db";
import { z } from "zod";
import bcrypt from "bcrypt";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import getSession from "@/lib/session";

const checkUniqueUsername = async (username: string) => {
  const user = await db.user.findUnique({
    where: { username },
    select: { id: true },
  });
  return !Boolean(user);
};

const checkUniqueEmail = async (email: string) => {
  const user = await db.user.findUnique({
    where: { email },
    select: { id: true },
  });
  return !Boolean(user);
};

const formSchmea = z
  .object({
    username: z
      .string()
      .min(3, "너무 짧아!")
      .max(10, "너무 길어!")
      .refine(checkUniqueUsername, "이미 사용중인 이름입니다."),
    email: z
      .string()
      .email()
      .toLowerCase()
      .trim()
      .refine(checkUniqueEmail, "이미 사용중인 이메일입니다."),
    password: z.string().min(PASSWORD_MIN_LENGTH),
    // .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR)
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
  const result = await formSchmea.safeParseAsync(data);
  if (!result.success) {
    return result.error?.flatten();
  } else {
    const hashedPassword = await bcrypt.hash(result.data.password, 12);
    // console.log(hashedPassword);
    const user = await db.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashedPassword,
      },
      select: { id: true },
    });
    console.log(user);
    const session = await getSession();
    session.id = user.id;
    await session.save();

    redirect("/profile");
  }
}
