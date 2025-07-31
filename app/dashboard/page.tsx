import { PageWrapper } from '@/components/page-wrapper';
import { getNotebooks } from '@/server/notebooks';
import { Notebook } from '@/db/schema';
import { CreateNotebookButton } from '@/components/create-notebook-button';
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';

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
            <Card key={notebook.id} className="col-span-1">
              <CardHeader>
                <CardTitle>{notebook.name}</CardTitle>
              </CardHeader>
              <CardFooter>
                <div className="flex flex-row items-center justify-start gap-2">
                  <Button><Link href={`/dashboard/notebook/${notebook?.id}`}>View</Link></Button>
                  <Button variant="destructive" className="cursor-pointer">
                    <Icon name="Trash2" />{" "}Delete
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}

          {notebooks.success && (notebooks?.data?.length === 0 && (
            <div className="text-muted-foreground">No notebooks found</div>
          ))}
        </div>
      </div>
    </PageWrapper>
  )
}
