import { PageWrapper } from "@/components/page-wrapper";
import { Button } from "@/components/ui/button";
import { getNotebookById } from "@/server/notebooks";

type Params = Promise<{
  notebookId: string;
}>;


export default async function Page({ params }: { params: Params }) {
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
        
                    <Button>Add note</Button>
                </div>
    
                <div>
                    
                </div>
            </div>
        </PageWrapper>
    )
}