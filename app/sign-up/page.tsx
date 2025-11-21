"use client";
import Cookie from "js-cookie";
import { Button } from "../../components/Button";
import { useRouter } from "next/navigation";
import { useState, createRef, useContext, useEffect } from "react";
import FormField from "@/components/FormField";
import {
  isPresence,
  isValidEmail,
  isValidLength,
  isValidPassword,
} from "../../utils/validators.util";
import { initFormSignup } from "../../constants/init-form";
import { FormFieldRef } from "../../types";
import Link from "next/link";
import UsersServices from "@/services/users.service";
import toast from "react-hot-toast";
import { setRestAuth } from "@/services/rest-client";
import { AUTH_KEY } from "@/constants/auth.constant";
import { AppContext } from "@/contexts/app.context";

export default function SignUp() {
  const { setUser } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(initFormSignup);
  const router = useRouter();

  const fullNameRef = createRef<FormFieldRef>();
  const emailRef = createRef<FormFieldRef>();
  const passwordRef = createRef<FormFieldRef>();
  const confirmPasswordRef = createRef<FormFieldRef>();
  const isFormValid = () => {
    return (
      !fullNameRef.current?.validate() &&
      !emailRef.current?.validate() &&
      !passwordRef.current?.validate() &&
      !confirmPasswordRef.current?.validate() &&
      form.password === form.confirmPassword
    );
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
      UsersServices.signUp({
        fullName: form.full_name,
        email: form.email,
        password: form.password,
        confirmPassword: form.confirmPassword,
      })
        .then((resp) => {
          if (resp) {
            setRestAuth(resp.token);
            Cookie.set(AUTH_KEY, resp.token);
            router.push("/accounts");
            setUser(resp.user);
          }
        })
        .catch((error) => toast.error(error || "Something went wrong."))
        .finally(() => setLoading(false));
    }
  };

  return (
    <div className="flex size-full min-h-screen bg-home-gradient flex-col pt-[80px] items-center pb-16 px-4 md:pt-[120px] bg-rafl_violet-950">
      <div className="flex flex-col w-full gap-y-7 max-w-[419px]">
        <h1 className="font-black text-rafl_violet-50 text-center text-[64px] leading-[72px]">
          sign up
        </h1>
        <div className="flex flex-col w-full">
          <div className="flex flex-col w-full gap-y-6 p-6 bg-rafl_violet-50 rounded-[32px]">
            <div className="flex flex-col gap-3 mt-1">
              <FormField
                id="full_name"
                label="full name"
                placeholder="full name"
                ref={fullNameRef}
                onChange={(value) => onChangeFormField(value, "full_name")}
                checkErrors={[
                  (val: string) => isPresence(val, "This field is required"),
                  (val: string) =>
                    isValidLength(
                      val,
                      "Full name must be at least 2 characters",
                      2
                    ),
                ]}
                customClass="font-bold"
                value={form.full_name}
                autoComplete="off"
                onKeyDown={(e) => e.key === "Enter" && onSubmit()}
              />
              <FormField
                id="email"
                label="e-mail"
                placeholder="john.smith@gmail.com "
                ref={emailRef}
                onChange={(value) => onChangeFormField(value, "email")}
                checkErrors={[
                  (val: string) => isPresence(val, "This field is required"),
                  (val: string) =>
                    isValidEmail(val, "Please enter a valid email"),
                ]}
                customClass="font-bold"
                value={form.email}
                autoComplete="off"
                onKeyDown={(e) => e.key === "Enter" && onSubmit()}
              />
              <FormField
                id="password"
                type="password"
                label="password"
                placeholder="password"
                ref={passwordRef}
                onChange={(value) => onChangeFormField(value, "password")}
                checkErrors={[
                  (val: string) => isPresence(val, "This field is required"),
                  (val: string) =>
                    isValidPassword(
                      val,
                      "Password must be at least 8 characters"
                    ),
                ]}
                customClass="font-bold"
                value={form.password}
                autoComplete="off"
                onKeyDown={(e) => e.key === "Enter" && onSubmit()}
              />
              <FormField
                id="confirmPassword"
                type="password"
                placeholder="confirm password"
                ref={confirmPasswordRef}
                autoComplete="off"
                label="confirm password"
                onChange={(value) =>
                  onChangeFormField(value, "confirmPassword")
                }
                customClass="font-bold"
                value={form.confirmPassword}
                checkErrors={[
                  (val: string) => isPresence(val, "This field is required"),
                  (val: string) =>
                    val !== form.password
                      ? "Passwords do not match"
                      : undefined,
                ]}
                onKeyDown={(e) => e.key === "Enter" && onSubmit()}
              />
            </div>
            <div className="flex flex-col w-full gap-y-6 mt-[30px]">
              <Button
                type="submit"
                onClick={onSubmit}
                variant="primary"
                className="w-full py-[10px] text-2xl"
                loading={loading}
              >
                Sign Up
              </Button>
              <div className="flex justify-center items-center gap-x-1 font-bold text-xl leading-5">
                <div className="text-rafl_violet-400 text-xl font-bold inline-flex flex-nowrap">
                  already have an account?
                </div>
                <Link
                  href="/login"
                  className="underline decoration-solid text-xl decoration-[2px] font-bold text-rafl_violet-700"
                >
                  sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
