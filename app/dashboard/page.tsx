import { Notebooks } from '@/components/notebooks';
import { PageWrapper } from '@/components/page-wrapper';
import { getNotebooks } from '@/server/notebooks';
import { Notebook } from '@/db/schema';
import { CreateNotebookButton } from '@/components/create-notebook-button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from 'next/link';

export default async function Page() {
  const notebooks = await getNotebooks()

  return (
    <PageWrapper breadcrumbs={[{ label: "Dashboard", href: "/dashboard"}]}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row items-center justify-between w-full">
          <h1 className="text-xl">Notebooks</h1>

          <CreateNotebookButton />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {notebooks.success && (notebooks?.data ?? []).map((notebook: Notebook) => (
            <Link href={`/dashboard/notebook/${notebook?.id}`}  key={notebook.id} className="col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>{notebook.name}</CardTitle>
                </CardHeader>
              </Card>
            </Link>
          ))}

          {notebooks.success && (notebooks?.data?.length === 0 && (
            <div className="text-muted-foreground">No notebooks found</div>
          ))}
        </div>
      </div>
    </PageWrapper>
  )
}
