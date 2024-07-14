import dynamic from 'next/dynamic'
import { EditorState } from 'draft-js'
import { EditorProps } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

const EditorComponent = dynamic<EditorProps>(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false },
)

interface RichTextEditorProps {
  value: EditorState
  onChange: (state: EditorState) => void
}
export default function Editor({ value, onChange }: RichTextEditorProps) {
  return (
    <EditorComponent
      editorState={value}
      toolbarClassName="bg-pri"
      wrapperClassName="bg-red"
      editorClassName="bg-red"
      onEditorStateChange={onChange}
    />
  )
}
