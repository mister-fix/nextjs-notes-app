import React from 'react'
import { getNoteById } from '@/server/notes'
import { PageWrapper } from "@/components/page-wrapper"
import TextEditor from '@/components/text-editor';
import { JSONContent } from '@tiptap/react';

type Params = Promise<{
  noteId: string;
}>;


const Page = async ({ params }: { params: Params }) => {
    const { noteId } = await params;
    const { note } = await getNoteById(noteId);

    const breadcrumbs = [
      { label: 'Dashboard', href: '/dashboard' },
      { label: note?.notebook?.name ?? 'Notebook', href: `/dashboard/notebook/${note?.notebook?.id}` },
      { label: `${note?.title}`, href: `/dashboard/notebook/${note?.notebook?.id}/note/${note?.id}` },
    ]

  return (
    <PageWrapper breadcrumbs={breadcrumbs}>
      <div className="flex flex-col gap-4">
          <div className="flex flex-row items-center justify-between w-full">
              <h1 className="text-xl">{note?.title}</h1>
          </div>

          <div className="flex flex-col">
            <TextEditor content={note?.content as JSONContent[]} noteId={note?.id} />
          </div>
      </div>
    </PageWrapper>
  )
}

export default Page;