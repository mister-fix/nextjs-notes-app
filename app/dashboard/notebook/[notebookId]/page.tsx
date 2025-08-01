import { PageWrapper } from "@/components/page-wrapper";
import { getNotebookById } from "@/server/notebooks";
import { Note } from "@/db/schema";
import { CreateNoteButton } from "@/components/create-note-button";
import NoteCard from './note/[noteId]/NoteCard'
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';

type Params = Promise<{
  notebookId: string;
}>;


export default async function Page({ params }: { params: Params }) {
    const session = await getSession();

    if (!session) redirect('/sign-in')

    const { notebookId } = await params;
    const { notebook } = await getNotebookById(notebookId);

    const breadcrumbs = [
      { label: 'Dashboard', href: '/dashboard' },
      { label: notebook?.name ?? 'Notebook', href: `/dashboard/notebook/${notebook?.id}` },
    ]

    return (
        <PageWrapper breadcrumbs={breadcrumbs}>
            <div className="flex flex-col gap-4">
                <div className="flex flex-row items-center justify-between w-full">
                    <h1 className="text-xl">{notebook?.name}</h1>
        
                    <CreateNoteButton notebookId={notebookId} />
                </div>
    
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                    {notebook?.notes && (notebook?.notes ?? []).map((note: Note) => (
                        <NoteCard key={note.id} note={note} />
                    ))}
        
                    {notebook?.notes && (notebook?.notes?.length === 0 && (
                        <div className="text-muted-foreground">No notes found</div>
                    ))}
                </div>
            </div>
        </PageWrapper>
    )
}