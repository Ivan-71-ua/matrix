import { Editor } from '@tinymce/tinymce-react';

import { editorConfig } from '@/constants/editor-config';

type RichEditorProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function RichEditor({ value, onChange }: RichEditorProps) {
  return (
    <Editor
      apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
      init={editorConfig}
      onEditorChange={onChange}
      value={value}
    />
  );
}
