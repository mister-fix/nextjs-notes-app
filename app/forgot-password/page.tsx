import { ForgotPasswordForm } from "@/components/forms/forgot-password-form"
import { Metadata } from "next";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "",
};

export default async function Page() {
  const session = await getSession()

  if (session) redirect('/dashboard')
    
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <ForgotPasswordForm />
      </div>
    </div>
  )
}
