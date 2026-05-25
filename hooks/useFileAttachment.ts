import { useState, useRef } from "react";

export function useFileAttachment() {
  const [files, setFiles] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const openFilePicker = () => inputRef.current?.click();

  const addFiles = (newFiles: FileList | null) => {
    if(!newFiles) return;
    setFiles((prev) => [...prev, ...Array.from(newFiles)]);
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  const clearFiles = () => setFiles([]);

  return { files, inputRef, openFilePicker, addFiles, removeFile, clearFiles };
}
