import * as React from 'react';
import { Html } from '@react-email/html';
import { Tailwind } from '@react-email/tailwind';
import { Button } from '@react-email/button';
import { Head } from '@react-email/head';

interface PasswordResetEmailProps {
  name?: string;
  passwordResetUrl: string;
};

export default function PasswordResetEmail({
  name,
  passwordResetUrl,
}: PasswordResetEmailProps) {
  const firstName = name?.split(' ')[0]

  return (
    <Html>
      <Tailwind>
        <Head />
        <div className="bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 sm:p-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Reset your account password
              </h1>
              <p className="text-gray-700 text-base mb-6">
                Hey {firstName}, you requested a password reset link! To complete,
                please click the button below:
              </p>
              <div className="text-center mb-6">
                <Button>
                    <a
                    href={passwordResetUrl}
                    className="inline-block bg-blue-600 text-white font-semibold text-sm px-6 py-3 rounded-md hover:bg-blue-700"
                    >
                    Reset Password
                    </a>
                </Button>
              </div>
              <p className="text-gray-600 text-sm">
                If the button above doesn’t work, paste the following link into your browser:
              </p>
              <p className="text-gray-500 text-xs break-words mt-2">{passwordResetUrl}</p>
              <p className="text-gray-500 text-xs mt-6">
                If you did not make this request, you can safely ignore this email.
              </p>
            </div>
          </div>
          <footer className="text-center text-gray-400 text-xs mt-8">
            &copy; {new Date().getFullYear()} NotesApp. All rights reserved.
          </footer>
        </div>
      </Tailwind>
    </Html>
  );
}
