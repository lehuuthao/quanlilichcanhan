"use client";
import Cookie from "js-cookie";
import { Button } from "../../components/Button";
import { useRouter } from "next/navigation";
import { useState, useRef, useContext } from "react";
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
  const router = useRouter();
  const { setUser, configureAuth } = useContext(AppContext);

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(initFormSignup);

  const fullNameRef = useRef<FormFieldRef>(null);
  const emailRef = useRef<FormFieldRef>(null);
  const passwordRef = useRef<FormFieldRef>(null);

  const onChangeField = (e: any, field: string) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const isFormValid = () => {
    const fn = fullNameRef.current?.validate?.() || false;
    const email = emailRef.current?.validate?.() || false;
    const pwd = passwordRef.current?.validate?.() || false;

    return !fn && !email && !pwd;
  };

  const onSubmit = () => {
    if (!isFormValid() || loading) return;

    setLoading(true);

    UsersServices.signUp({
      name: form.name,
      email: form.email,
      password: form.password,
    })
      .then((resp) => {
        if (!resp) return;

        setRestAuth(resp.token);
        Cookie.set(AUTH_KEY, resp.token);

        setUser(resp.user);
        configureAuth();
        router.push("/tags");
      })
      .catch((error) => toast.error(error || "Something went wrong."))
      .finally(() => setLoading(false));
  };

  const onEnter = (e: any) => {
    if (e.key === "Enter") onSubmit();
  };

  return (
    <div className="flex size-full min-h-screen bg-home-gradient bg-rafl_violet-950 pt-[80px] md:pt-[120px] px-4 pb-16 flex-col items-center">
      <div className="flex flex-col w-full max-w-[419px] gap-y-7">
        <h1 className="font-black text-rafl_violet-50 text-center text-[64px] leading-[72px]">
          sign up
        </h1>

        <div className="flex flex-col w-full">
          <div className="flex flex-col gap-y-6 p-6 bg-rafl_violet-50 rounded-[32px]">
            <FormField
              id="full_name"
              label="full name"
              placeholder="full name"
              ref={fullNameRef}
              value={form.name}
              onChange={(v) => onChangeField(v, "name")}
              checkErrors={[
                (v: string) => isPresence(v, "This field is required"),
                (v: string) =>
                  isValidLength(
                    v,
                    "Full name must be at least 2 characters",
                    2
                  ),
              ]}
              customClass="font-bold"
              autoComplete="off"
              onKeyDown={onEnter}
            />

            <FormField
              id="email"
              label="e-mail"
              placeholder="john.smith@gmail.com"
              ref={emailRef}
              value={form.email}
              onChange={(v) => onChangeField(v, "email")}
              checkErrors={[
                (v: string) => isPresence(v, "This field is required"),
                (v: string) => isValidEmail(v, "Please enter a valid email"),
              ]}
              customClass="font-bold"
              autoComplete="off"
              onKeyDown={onEnter}
            />

            <FormField
              id="password"
              type="password"
              label="password"
              placeholder="password"
              ref={passwordRef}
              value={form.password}
              onChange={(v) => onChangeField(v, "password")}
              checkErrors={[
                (v: string) => isPresence(v, "This field is required"),
                (v: string) =>
                  isValidPassword(v, "Password must be at least 8 characters"),
              ]}
              customClass="font-bold"
              autoComplete="off"
              onKeyDown={onEnter}
            />

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

              <div className="flex justify-center items-center gap-x-1 font-bold text-xl">
                <div className="text-rafl_violet-400">
                  already have an account?
                </div>
                <Link
                  href="/login"
                  className="underline decoration-solid decoration-[2px] text-rafl_violet-700 font-bold"
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
