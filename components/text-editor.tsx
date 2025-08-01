"use client";

import { TextStyleKit } from '@tiptap/extension-text-style'
import { TextAlign } from '@tiptap/extension-text-align'
import { Underline as TextUnderline } from '@tiptap/extension-underline'
import type { Editor } from '@tiptap/react'
import { EditorContent, useEditor, useEditorState, JSONContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React from 'react'
import { Button } from './ui/button';
import { updateNote } from '@/server/notes';
import {
    Bold,
    Italic,
    AlignLeft,
    AlignRight,
    AlignCenter,
    AlignJustify,
    TextQuote,
    Superscript,
    Subscript,
    Link,
    Strikethrough,
    Underline,
    Code,
    Undo,
    Redo,
    List,
    ListOrdered,
    Pilcrow,
    Minus,
    CodeXml,
    CornerDownRight,
    ChevronDown,
    Eraser,
    Ban
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const extensions = [TextStyleKit, StarterKit, TextAlign.configure({ types: ['heading', 'paragraph'] })]

interface Props {
  content?: JSONContent[];
  noteId?: string;
}

/**
 * * TODO: Add underline
 */

function MenuBar({ editor }: { editor: Editor }) {
  // Read the current editor's state, and re-render the component when it changes
  const editorState = useEditorState({
    editor,
    selector: ctx => {
      return {
        isBold: ctx.editor.isActive('bold') ?? false,
        canBold: ctx.editor.can().chain().toggleBold().run() ?? false,
        isItalic: ctx.editor.isActive('italic') ?? false,
        canItalic: ctx.editor.can().chain().toggleItalic().run() ?? false,
        isStrike: ctx.editor.isActive('strike') ?? false,
        canStrike: ctx.editor.can().chain().toggleStrike().run() ?? false,
        isCode: ctx.editor.isActive('code') ?? false,
        canCode: ctx.editor.can().chain().toggleCode().run() ?? false,
        canClearMarks: ctx.editor.can().chain().unsetAllMarks().run() ?? false,
        isParagraph: ctx.editor.isActive('paragraph') ?? false,
        isHeading1: ctx.editor.isActive('heading', { level: 1 }) ?? false,
        isHeading2: ctx.editor.isActive('heading', { level: 2 }) ?? false,
        isHeading3: ctx.editor.isActive('heading', { level: 3 }) ?? false,
        isHeading4: ctx.editor.isActive('heading', { level: 4 }) ?? false,
        isHeading5: ctx.editor.isActive('heading', { level: 5 }) ?? false,
        isHeading6: ctx.editor.isActive('heading', { level: 6 }) ?? false,
        isBulletList: ctx.editor.isActive('bulletList') ?? false,
        isOrderedList: ctx.editor.isActive('orderedList') ?? false,
        isCodeBlock: ctx.editor.isActive('codeBlock') ?? false,
        isBlockquote: ctx.editor.isActive('blockquote') ?? false,
        canUndo: ctx.editor.can().chain().undo().run() ?? false,
        canRedo: ctx.editor.can().chain().redo().run() ?? false,
      }
    },
  })

  const getActiveHeading = () => {
    if (editorState?.isHeading1) return "H1";
    if (editorState?.isHeading2) return "H2";
    if (editorState?.isHeading3) return "H3";
    if (editorState?.isHeading4) return "H4";
    if (editorState?.isHeading5) return "H5";
    if (editorState?.isHeading6) return "H6";

    return "H1"
  }

  return (
    <div className="border p-2 rounded-tl-xl rounded-tr-xl bg-neutral-300 dark:bg-neutral-900">
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editorState.canBold}
            className={cn('cursor-pointer', editorState.isBold ? 'bg-stone-800 text-white is-active hover:bg-[#6a00f5]/80' : '')}
          >
            <Bold />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editorState.canItalic}
            className={cn('cursor-pointer', editorState.isItalic ? 'bg-stone-800 text-white is-active hover:bg-[#6a00f5]/80' : '')}
          >
            <Italic />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={!editorState.canStrike}
            className={cn('cursor-pointer', editorState.isStrike ? 'bg-stone-800 text-white is-active hover:bg-[#6a00f5]/80' : '')}
          >
            <Strikethrough />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => editor.chain().focus().toggleCode().run()}
            disabled={!editorState.canCode}
            className={cn('cursor-pointer', editorState.isCode ? 'bg-stone-800 text-white is-active hover:bg-[#6a00f5]/80' : '')}
          >
            <Code />
          </Button>
          <Button
            size="sm"
            variant="ghost" 
            onClick={() => editor.chain().focus().unsetAllMarks().run()}
            className="cursor-pointer hover:bg-[#6a00f5] hover:text-white focus:text-white focus:bg-[#6a00f5]/80"
          >
              <Eraser />
          </Button>
        </div>

        <div className="w-px h-6 bg-border mx-1" />

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => editor.chain().focus().setParagraph().run()}
            className={cn('cursor-pointer', editorState.isParagraph ? 'bg-stone-800 text-white is-active hover:bg-[#6a00f5]/80' : '')}
          >
            <Pilcrow />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={cn('cursor-pointer', editorState.isHeading1 ? 'bg-stone-800 text-white is-active hover:bg-[#6a00f5]/80 text-center' : '')}
              >
                {getActiveHeading()}
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-popover border">
              <DropdownMenuItem
                onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()} 
                className="text-popover-foreground hover:bg-accent hover:text-accent-foreground" 
              >
                Heading 1
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()} 
                className="text-popover-foreground hover:bg-accent hover:text-accent-foreground" 
              >
                Heading 2
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()} 
                className="text-popover-foreground hover:bg-accent hover:text-accent-foreground" 
              >
                Heading 3
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => editor?.chain().focus().toggleHeading({ level: 4 }).run()} 
                className="text-popover-foreground hover:bg-accent hover:text-accent-foreground" 
              >
                Heading 4
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => editor?.chain().focus().toggleHeading({ level: 5 }).run()} 
                className="text-popover-foreground hover:bg-accent hover:text-accent-foreground" 
              >
                Heading 5
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => editor?.chain().focus().toggleHeading({ level: 6 }).run()} 
                className="text-popover-foreground hover:bg-accent hover:text-accent-foreground" 
              >
                Heading 6
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            size="sm"
            variant="ghost"
            onClick={() => editor.chain().focus().clearNodes().run()}
            className="cursor-pointer hover:bg-[#6a00f5] hover:text-white focus:text-white focus:bg-[#6a00f5]/80"
          >
            <Ban />
          </Button>
        </div>

        <div className="w-px h-6 bg-border mx-1" />

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={cn('cursor-pointer', editorState.isBulletList ? 'bg-stone-800 text-white is-active hover:bg-[#6a00f5]/80' : '')}
          >
            <List />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={cn('cursor-pointer', editorState.isOrderedList ? 'bg-stone-800 text-white is-active hover:bg-[#6a00f5]/80' : '')}
          >
            <ListOrdered />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={cn('cursor-pointer', editorState.isBlockquote ? 'bg-stone-800 text-white is-active hover:bg-[#6a00f5]/80' : '')}
          >
            <TextQuote />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={cn('cursor-pointer', editorState.isCodeBlock ? 'bg-stone-800 text-white is-active hover:bg-[#6a00f5]/80' : '')}
          >
            <CodeXml />
          </Button>
        </div>

        <div className="w-px h-6 bg-border mx-1" />

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}
          >
            <AlignLeft />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}
          >
            <AlignCenter />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}
          >
            <AlignRight />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
            className={editor.isActive({ textAlign: 'justify' }) ? 'is-active' : ''}
          >
            <AlignJustify />
          </Button>
        </div>

        <div className="w-px h-6 bg-border mx-1" />

        <div className="flex items-center gap-2">
          <Button 
            size="sm" 
            variant="ghost" 
            className="cursor-pointer" 
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
          >
            <Minus />
          </Button>
          <Button 
            size="sm" 
            variant="ghost" 
            className="cursor-pointer" 
            onClick={() => editor.chain().focus().setHardBreak().run()}
          >
            <CornerDownRight className="scale-x-[-1]" />
          </Button>
        </div>
        
        <div className="w-px h-6 bg-border mx-1" />

        <div className="flex items-center gap-2">
          <Button size="sm" variant="ghost" className="cursor-pointer" onClick={() => editor.chain().focus().undo().run()} disabled={!editorState.canUndo}>
            <Undo />
          </Button>
          <Button size="sm" variant="ghost" className="cursor-pointer" onClick={() => editor.chain().focus().redo().run()} disabled={!editorState.canRedo}>
            <Redo />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function TextEditor({ content, noteId }: Props) {
  const editor = useEditor({
    extensions,
    immediatelyRender: false,
    autofocus: true,
    editable: true,
    injectCSS: false,
    onUpdate: ({ editor }) => {  
      if (noteId)  updateNote(noteId, { content: editor.getJSON() })
    },
    content,
  })

  if(!editor) return null;

  return (
    <div className="w-full max-w-7xl flex flex-col">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className="border border-t-0 border-muted p-4 h-full rounded-bl-xl rounded-br-xl min-h-96 focus:border-neutral-400" />
    </div>
  )
}
