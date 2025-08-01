import { betterAuth } from "better-auth";
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '@/db/drizzle';
import { schema, verification } from "@/db/schema";
import { nextCookies } from "better-auth/next-js";
import { Resend } from "resend";
import VerificationEmail from '@/components/emails/verification-email'
import PasswordResetEmail from '@/components/emails/reset-email'
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from "next/server";
import { and, eq, gt, like } from "drizzle-orm";

const resend = new Resend(process.env.RESEND_API_KEY)

export const auth = betterAuth({
  emailVerification: {
    sendVerificationEmail: async ( { user, url, token }, request) => {
      const { data, error } = await resend.emails.send({
        from: 'NotesApp <onboarding@stephenwm.me>',
        to: [user.email],
        subject: 'Verify your email address',
        react: VerificationEmail({ name: user.name, verificationUrl: url })
      });
      if(error) {
        console.error("Resend error sending verification email:", error)
        throw error
      }
    },
    sendOnSignUp: true
  },
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url, token}, request) => {
      const { data, error } = await resend.emails.send({
        from: 'NotesApp <noreply@stephenwm.me>',
        to: [user.email],
        subject: 'Reset your account password',
        react: PasswordResetEmail({ name: user.name, passwordResetUrl: url})
      })
    }
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: schema
  }),
  plugins: [nextCookies()]
});

export const getSession = async () => auth.api.getSession({
  headers: await headers()
})

// export const validateResetToken = async (token: string) => {
//   const validToken = await db.query.verification.findFirst({
//     where: and(
//       like(verification.identifier, `reset-password:${token}`),
//       gt(verification.expiresAt, new Date())
//     ),
//   });
  
//   if (!validToken) return false; 
// }