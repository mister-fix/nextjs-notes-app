import { SignUpForm } from "@/components/forms/signup-form"
import { getSession } from "@/lib/auth";
import { Metadata } from "next";
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create your NotesApp account and start writing",
};

export default async function Page() {
  const session = await getSession();

  if (session) redirect('/dashboard')

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignUpForm />
      </div>
    </div>
  )
}
