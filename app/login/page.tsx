"use client";
import FromButton from "@/components/button";
import FormInput from "@/components/input";
import SocialLogin from "@/components/social-login";
import { useFormState } from "react-dom";
import { login } from "./actions";
import { PASSWORD_MIN_LENGTH } from "@/lib/constants";

export default function Login() {
  const [state, action] = useFormState(login, null);
  return (
    <>
      <div className="flex flex-col gap-10 py-6">
        <div className="flex flex-col gap-2 *:font-medium">
          <h1 className="text-2xl">안녕하세요!</h1>
          <h2 className="text-xl">Fill in the form below to join!</h2>
        </div>
        <form action={action} className="flex flex-col gap-3">
          <FormInput
            name="email"
            type={"email"}
            placeholder={"Email"}
            required={true}
            errors={state?.fieldErrors.email}
          />
          <FormInput
            name="password"
            type={"password"}
            placeholder={"Password"}
            required={true}
            minLength={PASSWORD_MIN_LENGTH}
            errors={state?.fieldErrors.password}
          />
          <FromButton text={"Login"} />
        </form>
        <SocialLogin />
      </div>
    </>
  );
}
