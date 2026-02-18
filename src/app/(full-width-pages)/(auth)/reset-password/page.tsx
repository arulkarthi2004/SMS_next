import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password | SMS",
  description: "Reset password page for SMS",
};

export default function ResetPasswordPage() {
  return <ResetPasswordForm />;
}

