"use client";
import Checkbox from "@/components/form/input/Checkbox";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "@/icons";
import Link from "next/link";
import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useAppDispatch } from "@/store/hooks";
import { setCredentials } from "@/store/slices/authSlice";
import { loginApi } from "@/api/authApi";
import { useRouter } from "next/navigation";
import type { AxiosError } from "axios";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setAuthError("");

      const data = await loginApi(email, password);

      localStorage.setItem("token", data.token);

      dispatch(
        setCredentials({
          user: data.user,
          token: data.token,
        })
      );

      const routeByRole: Record<string, string> = {
        admin: "/",
        teacher: "/student-list",
        client: "/student-list",
        student: "/student-list",
      };

      router.replace(routeByRole[data.user.role] ?? "/");
    } catch (error) {
      const axiosError = error as AxiosError<{
        message?: string;
        data?: { error?: string };
      }>;
      const message =
        axiosError.response?.data?.message ||
        axiosError.response?.data?.data?.error ||
        "Login failed. Please check your credentials.";
      setAuthError(message);
      console.error("Login failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              {t("auth.signin.title")}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t("auth.signin.subtitle")}
            </p>
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <Label>
                    {t("auth.signin.email")} <span className="text-error-500">*</span>{" "}
                  </Label>
                  <Input
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (authError) setAuthError("");
                    }}
                    placeholder={t("auth.signin.emailPlaceholder")}
                    type="email"
                  />
                </div>
                <div>
                  <Label>
                    {t("auth.signin.password")} <span className="text-error-500">*</span>{" "}
                  </Label>
                  <div className="relative">
                    <Input
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (authError) setAuthError("");
                      }}
                      type={showPassword ? "text" : "password"}
                      placeholder={t("auth.signin.passwordPlaceholder")}
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                      )}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox checked={isChecked} onChange={setIsChecked} />
                    <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
                      {t("auth.signin.keepLoggedIn")}
                    </span>
                  </div>
                  <Link
                    href="/reset-password"
                    className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                  >
                    {t("auth.signin.forgotPassword")}
                  </Link>
                </div>
                {authError ? (
                  <div className="rounded-lg border border-error-200 bg-error-50 px-4 py-3 text-sm text-error-700 dark:border-error-500/20 dark:bg-error-500/10 dark:text-error-400">
                    {authError}
                  </div>
                ) : null}
                <div>
                  {/* <Button className="w-full" size="sm">
                    {t("auth.signin.submit")}
                  </Button> */}
                  <Button className="w-full" size="sm" type="submit" disabled={loading}>
                    {loading ? "Loading..." : t("auth.signin.submit")}
                  </Button>
                </div>
              </div>
            </form>

            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                {t("auth.signin.noAccount")} {""}
                <Link
                  href="/signup"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  {t("auth.signin.signUp")}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
