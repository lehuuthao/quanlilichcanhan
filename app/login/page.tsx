"use client";
import Cookie from "js-cookie";
import { Button } from "../../components/Button";
import Link from "next/link";

import { useState, createRef, useContext } from "react";
import FormField from "../../components/FormField";
import {
  isPresence,
  isValidEmail,
  isValidPassword,
} from "../../utils/validators.util";
import { initFormLogin } from "../../constants/init-form";
import { FormFieldRef } from "../../types";
import UsersServices from "@/services/users.service";
import { useRouter } from "next/navigation";
import { AppContext } from "@/contexts/app.context";
import { AUTH_KEY } from "@/constants/auth.constant";
import { setRestAuth } from "@/services/rest-client";
import toast from "react-hot-toast";

export default function Login() {
  const { setUser } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(initFormLogin);
  const router = useRouter();

  const emailRef = createRef<FormFieldRef>();
  const passwordRef = createRef<FormFieldRef>();

  const isFormValid = () => {
    return !emailRef.current?.validate() && !passwordRef.current?.validate();
  };

  const onChangeFormField = (e: any, fieldName: string) => {
    setForm({
      ...form,
      [fieldName]: e.target.value,
    });
  };

  const onSubmit = () => {
    if (isFormValid() && !loading) {
      setLoading(true);
      UsersServices.login({
        ...form,
      })
        .then((resp) => {
          if (resp) {
            setRestAuth(resp.token);
            Cookie.set(AUTH_KEY, resp.token);
            router.push("/accounts");
            setUser(resp.user);
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error(error || "Something went wrong.");
        })
        .finally(() => setLoading(false));
    }
  };

  return (
    <div className="flex size-full min-h-screen bg-home-gradient flex-col pt-[90px] items-center px-4 md:pt-[140px] bg-rafl_violet-950">
      <div className="flex flex-col w-full gap-y-7 max-w-[419px]">
        <h1 className="font-black text-rafl_violet-50 text-center text-[64px] leading-[72px]">
          sign in
        </h1>
        <div className="flex flex-col w-full">
          <div className="flex flex-col w-full p-6 bg-rafl_violet-50 rounded-[32px]">
            <div className="flex flex-col gap-4">
              <FormField
                id="email"
                label="e-mail"
                placeholder="john.smith@gmail.com"
                ref={emailRef}
                onChange={(e) => onChangeFormField(e, "email")}
                checkErrors={[
                  (val: string) => isPresence(val, "This field is required"),
                  (val: string) =>
                    isValidEmail(val, "Please enter a valid email"),
                ]}
                customClass="font-bold"
                value={form.email ?? ""}
                autoComplete="off"
                onKeyDown={(e) => e.key === "Enter" && onSubmit()}
              />
              <FormField
                id="password"
                type="password"
                placeholder="password"
                ref={passwordRef}
                autoComplete="off"
                label="password"
                onChange={(e) => onChangeFormField(e, "password")}
                customClass="font-bold"
                value={form.password ?? ""}
                checkErrors={[
                  (val: string) => isPresence(val, "This field is required"),
                  (val: string) =>
                    isValidPassword(
                      val,
                      "Password must be at least 8 characters"
                    ),
                ]}
                onKeyDown={(e) => e.key === "Enter" && onSubmit()}
              />
            </div>
            <div className="flex flex-col w-full gap-y-6 mt-[50px]">
              <p className="text-center text-xl text-rafl_violet-700 underline decoration-[2px] font-bold">
                forgot password?
              </p>
              <Button
                onClick={onSubmit}
                type="submit"
                variant="primary"
                className="w-full py-[10px] text-2xl"
                loading={loading}
              >
                log in
              </Button>
              <div className="flex justify-center items-center gap-x-1 font-bold text-xl leading-5">
                <p className="text-rafl_violet-400 font-bold">
                  don’t have an account?
                </p>
                <Link
                  href="/sign-up"
                  className="ml-1 underline decoration-solid decoration-[2px] font-bold text-rafl_violet-700"
                >
                  sign up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
