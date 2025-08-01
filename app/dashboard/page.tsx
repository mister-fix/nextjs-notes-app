import { PageWrapper } from '@/components/page-wrapper';
import { getNotebooks } from '@/server/notebooks';
import { CreateNotebookButton } from '@/components/create-notebook-button';
import NotebookCard from './notebook/[notebookId]/NotebookCard';
import { NotebookWithNotes } from '@/server/notebooks';
import { Metadata } from 'next';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: "Dashboard",
  description: "NotesApp dashboard page",
};

export default async function Page() {
  const notebooks = await getNotebooks();
  const session = await getSession();

  if(!session) redirect('/sign-in');

  return (
    <PageWrapper breadcrumbs={[{ label: "Dashboard", href: "/dashboard"}]}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row items-center justify-between w-full">
          <h1 className="text-xl">Notebooks</h1>

          <CreateNotebookButton />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {notebooks.success && (notebooks?.data ?? []).map((notebook: NotebookWithNotes) => (
            <NotebookCard key={notebook.id} notebook={notebook} />
          ))}

          {notebooks.success && (notebooks?.data?.length === 0 && (
            <div className="text-muted-foreground">No notebooks found</div>
          ))}
        </div>
      </div>
    </PageWrapper>
  )
}
