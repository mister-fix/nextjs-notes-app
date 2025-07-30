import { Notebooks } from '@/components/notebooks';
import { PageWrapper } from '@/components/page-wrapper';
import { getNotebooks } from '@/server/notebooks';
import { Notebook } from '@/db/schema';
import { CreateNotebookButton } from '@/components/create-notebook-button';

export default async function Page() {
  const notebooks = await getNotebooks()

  return (
    <PageWrapper breadcrumbs={[{ label: "Dashboard", href: "/dashboard"}]}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row items-center justify-between w-full">
          <h1 className="text-xl">Notebooks</h1>

          <CreateNotebookButton />
        </div>

        <div>
          {notebooks.success && (notebooks?.data ?? []).map((notebook: Notebook) => (
            <div key={notebook.id}>{notebook.name}</div>
          ))}

          {notebooks.success && (notebooks?.data?.length === 0 && (
            <div className="text-muted-foreground">No notebooks found</div>
          ))}
        </div>
      </div>
    </PageWrapper>
  )
}
