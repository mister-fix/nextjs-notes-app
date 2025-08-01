import { SignInForm } from "@/components/forms/signin-form"
import { Metadata } from "next";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your account and start writing",
};

export default async function Page() {
  const session = await getSession()
  
  if (session) redirect('/dashboard');

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignInForm />
      </div>
    </div>
  )
}
