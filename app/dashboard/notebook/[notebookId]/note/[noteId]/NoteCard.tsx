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
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { deleteNote } from '@/server/notes';
import { Note } from '@/db/schema';
import { useTransition, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Icon } from '@/components/ui/icon';

interface Props {
    note: Note ;
}

const NotebookCard = ({ note }: Props) => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition()
    const [isOpen, setIsOpen] = useState(false)

    const handleDelete = async () => {
        try { 
            startTransition(async () => {
                await deleteNote(note.id);
                toast.success('Note deleted successfully')
                router.refresh()
            })
        }
        catch (error) {
            console.error('Failed to delete note')
            toast.error((error as Error)?.message)
        }
    }

  return (
    <Card key={note?.id}>
        <CardHeader>
            <CardTitle>{note?.title}</CardTitle>
        </CardHeader>
        <CardFooter>
            <div className='flex flex-row items-center justify-start gap-2'>
                <Button><Link href={`/dashboard/notebook/${note?.notebookId}/note/${note?.id}`}>View</Link></Button>
                
                <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                    <AlertDialogTrigger asChild>
                        <Button variant='destructive' className='cursor-pointer'>
                            <Icon name='Trash2' />{' '}Delete
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure you want to delete this note?</AlertDialogTitle>
                            <AlertDialogDescription>This action cannot be undone and will permanently delete the note.</AlertDialogDescription>
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