import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import React, { Suspense } from "react"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "NotesApp dashboard page",
};

interface Props {
    children: React.ReactNode
}

export default function DashboardLayout({ children }: Props) {
    return (
        <SidebarProvider>
            <Suspense fallback={<div>Loading...</div>}>
                <AppSidebar />
            </Suspense>
            <main className="w-full">
                {children}
            </main>
        </SidebarProvider>
    )
}