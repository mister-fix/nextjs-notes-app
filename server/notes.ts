'use server';

import { db } from '@/db/drizzle';
import { InsertNote, notes } from '@/db/schema';
import { auth } from '@/lib/auth';
import { eq } from 'drizzle-orm';
import { headers } from 'next/headers';

export const createNote = async (values: InsertNote) => {
    try { 
        await db.insert(notes).values(values);
        return { success: true, message: 'Note was created successfully'};
    }
    catch (error) {
        console.error((error as Error)?.message);
        return { success: false, message: 'Failed to create notes'};
    }
}

// export const getNotes = async () => {
//     try {
//         const session = await auth.api.getSession({
//             headers: await headers()
//         });

//         const userId = session?.user?.id;

//         if(!userId) {
//             return { success: false, message: 'User not found'};
//         }

//         const allNotes = await db.select().from(notes).where(eq(notes.userId, userId));

//         return { success: true, data: allNotes };
//     } catch (error) {
//         console.error((error as Error)?.message);
//         return { success: false, message: 'Failed to get notes'};
//     }
// }

export const getNoteById = async (id: string) => {
    try {
        const note = await db.query.notes.findFirst({ 
            where: eq(notes.id, id), 
            with: {
                notebook: true
            }
        })
        return { success: true, note }
    }
    catch (error) {
        console.error((error as Error)?.message)
        return { success: false, message: 'Failed to get notebook'}
    }
}

export const updateNote = async (id: string, values: Partial<InsertNote>) => {
    try {
        await db.update(notes).set(values).where(eq(notes.id, id));
        return { success: true, message: 'Note updated successfully'};
    }
    catch (error) {
        console.error((error as Error)?.message);
        return { success: false, message: 'Failed to update note'};
    }
}

export const deleteNote = async (id: string) => {
    try {
        await db.delete(notes).where(eq(notes.id, id));
        return { success: true, message: 'Note deleted successfully'};
    } 
    catch (error) {
        console.error((error as Error)?.message);
        return { success: false, message: 'Failed to delete note'};
    }
}