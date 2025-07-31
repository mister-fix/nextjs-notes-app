import { PageWrapper } from "@/components/page-wrapper";
import { Button } from "@/components/ui/button";
import { getNotebookById } from "@/server/notebooks";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Note } from "@/db/schema";
import Link from 'next/link';
import { Icon } from '@/components/ui/icon';

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
    
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                    {notebook?.notes && (notebook?.notes ?? []).map((note: Note) => (
                        <Card key={notebook.id} className="col-span-1">
                            <CardHeader>
                                <CardTitle>{note?.title}</CardTitle>
                            </CardHeader>
                            <CardFooter>
                                <div className="flex flex-row items-center justify-start gap-2">
                                    <Button><Link href={`/dashboard/notebook/${note?.notebookId}/note/${note?.id}`}>View</Link></Button>
                                    <Button variant="destructive" className="cursor-pointer">
                                        <Icon name="Trash2" />{" "}Delete
                                    </Button>
                                </div>
                            </CardFooter>
                        </Card>
                    ))}
        
                    {notebook?.notes && (notebook?.notes?.length === 0 && (
                        <div className="text-muted-foreground">No notes found</div>
                    ))}
                </div>
            </div>
        </PageWrapper>
    )
}