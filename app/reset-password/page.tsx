import { Metadata } from "next";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ResetPasswordForm } from "@/components/forms/reset-password-form";
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Sign in to your account and start writing",
};

export default async function Page() {
  const session = await getSession();

  if (session) redirect('/dashboard');
  
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Suspense fallback={<div>Loading...</div>}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  );
}