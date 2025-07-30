"use client";

import React from 'react'
import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { Icon } from '@/components/ui/icon';

export function SignOut() {
    const router = useRouter()

    const handleLogout = async () => {
        await authClient.signOut()
        router.push("/")
    }

  return (
    <Button variant="outline" onClick={handleLogout}>
      <div className="flex items-center gap-x-2">
        <span>Sign out</span>
        <Icon name="LogOut" size={18} />
      </div>
    </Button>
  )
}
