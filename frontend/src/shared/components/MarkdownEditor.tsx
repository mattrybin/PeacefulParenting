"use client"

import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  type MDXEditorMethods,
  type MDXEditorProps,
  toolbarPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  BlockTypeSelect
} from "@mdxeditor/editor"
// import { MDXEditor, MDXEditorMethods, headingsPlugin } from "@mdxeditor/editor"
import { FC } from "react"

interface EditorProps {
  markdown: string
  editorRef?: React.MutableRefObject<MDXEditorMethods | null>
}

/**
 * Extend this Component further with the necessary plugins or props you need.
 * proxying the ref is necessary. Next.js dynamically imported components don't support refs.
 */
export const MarkdownEditor: FC<EditorProps> = ({ markdown, editorRef }) => {
  return (
    <MDXEditor
      className="border-base-content/20 border rounded-box bg-base-100/50"
      contentEditableClassName="tailwind-prose p-4 outline-none"
      ref={editorRef}
      markdown={markdown}
      plugins={[
        listsPlugin(),
        quotePlugin(),

        markdownShortcutPlugin(),
        toolbarPlugin({
          toolbarContents: () => (
            <div className="markdown-editor-toolbar">
              <BlockTypeSelect />
              <div className="bold-italic-underline-toggles">
                <BoldItalicUnderlineToggles />
              </div>
            </div>
          )
        })
      ]}
    />
  )
}
