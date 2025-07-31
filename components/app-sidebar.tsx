import * as React from "react"
import { SearchForm } from "@/components/search-form"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { getNotebooks } from "@/server/notebooks"
import { Note } from "@/db/schema"
import Image from "next/image"
import SidebarData from "./sidebar-data"

export async function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const notebooks = await getNotebooks();
  const data = {
    navMain: notebooks.success
      ? notebooks.data.map((notebook) => ({
          title: notebook.name,
          url: `/dashboard/${notebook.id}`,
          items: (notebook.notes ?? []).map((note: Note) => ({
            title: note.title,
            url: `/dashboard/notebook/${notebook.id}/note/${note.id}`
          }))
        }))
      : []
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-3 px-2">
          <Image src="/logo.svg" alt="Logo" height={22} width={22} />
          <h2 className="text-xl font-semibold">NotesApp</h2>
        </div>
        <SearchForm />
      </SidebarHeader>
      <SidebarContent className="gap-0">
        <SidebarData data={data} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
