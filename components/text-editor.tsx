"use client";

import { TextStyleKit } from '@tiptap/extension-text-style'
import { TextAlign } from '@tiptap/extension-text-align'
import {Underline as TextUnderline} from '@tiptap/extension-underline'
import type { Editor } from '@tiptap/react'
import { EditorContent, useEditor, useEditorState, JSONContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React from 'react'
import '@/app/styles.css';
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
    CornerDownRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

const extensions = [TextStyleKit, StarterKit, TextAlign.configure({ types: ['heading', 'paragraph'] })]

interface Props {
    content?: JSONContent[];
    noteId?: string;
}

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

  return (
    <div className="border p-2 rounded-tl-xl rounded-tr-xl bg-neutral-900">
      <div className="flex flex-wrap gap-2">
        <Button
          size="icon"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editorState.canBold}
          className={cn('cursor-pointer', editorState.isBold ? 'bg-[#6a00f5] text-white is-active hover:bg-[#6a00f5]/80' : '')}
        >
          <Bold />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editorState.canItalic}
          className={cn('cursor-pointer', editorState.isItalic ? 'bg-[#6a00f5] text-white is-active hover:bg-[#6a00f5]/80' : '')}
        >
          <Italic />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editorState.canStrike}
          className={cn('cursor-pointer', editorState.isStrike ? 'bg-[#6a00f5] text-white is-active hover:bg-[#6a00f5]/80' : '')}
        >
          <Strikethrough />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editorState.canCode}
          className={cn('cursor-pointer', editorState.isCode ? 'bg-[#6a00f5] text-white is-active hover:bg-[#6a00f5]/80' : '')}
        >
          <Code />
        </Button>
        <Button variant="outline" onClick={() => editor.chain().focus().unsetAllMarks().run()} className="cursor-pointer hover:bg-[#6a00f5] hover:text-white focus:text-white focus:bg-[#6a00f5]/80">Clear marks</Button>
        <Button variant="outline" onClick={() => editor.chain().focus().clearNodes().run()} className="cursor-pointer hover:bg-[#6a00f5] hover:text-white focus:text-white focus:bg-[#6a00f5]/80">Clear nodes</Button>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={cn('cursor-pointer', editorState.isParagraph ? 'bg-[#6a00f5] text-white is-active hover:bg-[#6a00f5]/80' : '')}
        >
          <Pilcrow />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={cn('cursor-pointer', editorState.isHeading1 ? 'bg-[#6a00f5] text-white is-active hover:bg-[#6a00f5]/80' : '')}
        >
          H1
        </Button>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={cn('cursor-pointer', editorState.isHeading2 ? 'bg-[#6a00f5] text-white is-active hover:bg-[#6a00f5]/80' : '')}
        >
          H2
        </Button>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={cn('cursor-pointer', editorState.isHeading3 ? 'bg-[#6a00f5] text-white is-active hover:bg-[#6a00f5]/80' : '')}
        >
          H3
        </Button>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
          className={cn('cursor-pointer', editorState.isHeading4 ? 'bg-[#6a00f5] text-white is-active hover:bg-[#6a00f5]/80' : '')}
        >
          H4
        </Button>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
          className={cn('cursor-pointer', editorState.isHeading5 ? 'bg-[#6a00f5] text-white is-active hover:bg-[#6a00f5]/80' : '')}
        >
          H5
        </Button>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
          className={cn('cursor-pointer', editorState.isHeading6 ? 'bg-[#6a00f5] text-white is-active hover:bg-[#6a00f5]/80' : '')}
        >
          H6
        </Button>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={cn('cursor-pointer', editorState.isBulletList ? 'bg-[#6a00f5] text-white is-active hover:bg-[#6a00f5]/80' : '')}
        >
          <List />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={cn('cursor-pointer', editorState.isOrderedList ? 'bg-[#6a00f5] text-white is-active hover:bg-[#6a00f5]/80' : '')}
        >
          <ListOrdered />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={cn('cursor-pointer', editorState.isCodeBlock ? 'bg-[#6a00f5] text-white is-active hover:bg-[#6a00f5]/80' : '')}
        >
          <CodeXml />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={cn('cursor-pointer', editorState.isBlockquote ? 'bg-[#6a00f5] text-white is-active hover:bg-[#6a00f5]/80' : '')}
        >
          <TextQuote />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}
        >
          <AlignLeft />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}
        >
          <AlignCenter />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}
        >
          <AlignRight />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          className={editor.isActive({ textAlign: 'justify' }) ? 'is-active' : ''}
        >
          <AlignJustify />
        </Button>
        <Button size="icon" variant="ghost" className="cursor-pointer" onClick={() => editor.chain().focus().setHorizontalRule().run()}><Minus /></Button>
        <Button size="icon" variant="ghost" className="cursor-pointer" onClick={() => editor.chain().focus().setHardBreak().run()}><CornerDownRight className="scale-x-[-1]" /></Button>
        <Button size="icon" variant="ghost" className="cursor-pointer" onClick={() => editor.chain().focus().undo().run()} disabled={!editorState.canUndo}>
          <Undo />
        </Button>
        <Button size="icon" variant="ghost" className="cursor-pointer" onClick={() => editor.chain().focus().redo().run()} disabled={!editorState.canRedo}>
          <Redo />
        </Button>
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
        
        if (noteId) {
            const content = editor.getJSON();
            console.log(content)
            updateNote(noteId, { content: editor.getJSON() })
        }
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
