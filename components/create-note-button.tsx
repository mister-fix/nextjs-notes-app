"use client";

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import {
    Dialog, 
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { DialogDescription } from '@radix-ui/react-dialog';
import { useState } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { authClient } from "@/lib/auth-client"
import { createNote } from "@/server/notes"
import { Icon } from "@/components/ui/icon"
import { useRouter } from 'next/navigation';

const formSchema = z.object({
    title: z.string().min(2).max(50)
})

export const CreateNoteButton = ({ notebookId }: { notebookId: string }) => {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false);
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
        }
    })

    const handleRefresh = () => {
        router.refresh()
    }
    
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setIsLoading(true)
            
            const userId = (await authClient.getSession()).data?.user.id

            if(!userId) {
                toast.error("You must be logged in to create a note")
                return;
            }

            const { success, message} = await createNote({
                ...values,
                content: {},
                notebookId
            });

            if(success) {
                form.reset()
                toast.success("Note created successfully")
                setIsOpen(false)
                handleRefresh()
            } else {
                toast.error(message)
            }
        }
        catch (error) {
            console.error((error as Error)?.message)
        }
        finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button>Add note</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create new note</DialogTitle>
                    <DialogDescription className="mb-4">
                        Create a new note file.
                    </DialogDescription>
                    <div>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <FormField control={form.control} name="title" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input
                                                id="title"
                                                type="text"
                                                placeholder="Note title"
                                                {...field}
                                                // required
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                            
                                <div className="flex flex-col gap-3">
                                    <Button type="submit" className="w-full" disabled={isLoading}>
                                        {isLoading ? <Icon name="LoaderCircle" className="animate-spin" /> : "Create note"}
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}