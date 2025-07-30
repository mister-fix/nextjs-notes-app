"use server";

import { auth } from '@/lib/auth';

export const signInUser = async (email: string, password: string) => {
    try {
        await auth.api.signInEmail({
            body: {
                email,
                password
            },
        })

        return { success: true, message: "Signed in successfully"}
    } catch(error) {
        console.error(error)
        return { success: false, message: (error as Error)?.message|| "Failed to sign in"}
    }
}

export const signUpUser = async (name: string, email: string, password: string) => {
    try {
        await auth.api.signUpEmail({
            body: {
                name,
                email,
                password
            },
        })

        return { success: true, message: 'Signed up successfully'}
    }
    catch (error) {
        console.error(error)
        return { success: false, message: (error as Error)?.message || "Failed to sign up"}
    }
}

export const resetUserPassword = async (password: string) => {
    try {
        await auth.api.resetPassword({
            body: {
                newPassword: password
            }
        })

        return { success: true, message: 'Password reset successfully'}
    }
    catch (error) {
        console.error(error)
        return { success: false, message: (error as Error)?.message || "Failed to reset password"}
    }
}