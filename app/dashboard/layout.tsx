import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import React from "react"
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
            <AppSidebar />
            <main className="w-full">
                {children}
            </main>
        </SidebarProvider>
    )
}