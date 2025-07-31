'use client';

import React from 'react'
import Link from 'next/link';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { deleteNotebook } from '@/server/notebooks';
import { Notebook, Note } from '@/db/schema';
import { useTransition, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Icon } from '@/components/ui/icon';

interface Props {
    notebook: Notebook & { notes: Note[] };
}

const NotebookCard = ({ notebook }: Props) => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition()
    const [isOpen, setIsOpen] = useState(false)

    const handleDelete = async () => {
        try { 
            startTransition(async () => {
                const response = await deleteNotebook(notebook.id);

                if(response.success) {
                    toast.success('Notebook deleted successfully')
                    router.refresh()
                }
            })
        }
        catch (error) {
            console.error('Failed to delete notebook')
            toast.error((error as Error)?.message)
        }
    }

  return (
    <Card key={notebook.id}>
        <CardHeader>
            <CardTitle>{notebook?.name}</CardTitle>
            <CardDescription>{notebook?.notes?.length ?? 0} notes</CardDescription>
        </CardHeader>
        <CardFooter>
            <div className='flex flex-row items-center justify-start gap-2'>
                <Button><Link href={`/dashboard/notebook/${notebook.id}`}>View</Link></Button>
                
                <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                    <AlertDialogTrigger asChild>
                        <Button variant='destructive' className='cursor-pointer'>
                            <Icon name='Trash2' />{' '}Delete
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure you want to delete this notebook?</AlertDialogTitle>
                            <AlertDialogDescription>This action cannot be undone. This and will permanently delete the notebook and all its notes.</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDelete} disabled={isPending}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </CardFooter>
    </Card>
  )
}

export default NotebookCard