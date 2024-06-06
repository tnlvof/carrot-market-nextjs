"use server";

export async function handleForm(prevState: any, data: FormData) {
  console.log(prevState);
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return { errors: ["Invalid email or password", "zzzz"] };
}
