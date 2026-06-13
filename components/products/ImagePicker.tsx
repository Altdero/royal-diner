"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { CameraIcon, PhotoIcon } from "@heroicons/react/24/outline";
import { getImagePath } from "@/src/lib/utils/getImagePath";

interface ImagePickerProps {
  currentUrl?: string;
  onFileSelect: (file: File) => void;
}

export function ImagePicker({ currentUrl, onFileSelect }: ImagePickerProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(URL.createObjectURL(file));
    onFileSelect(file);
  };

  const displayUrl =
    previewUrl ?? (currentUrl ? getImagePath(currentUrl) : null);

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-stone-700">Image</span>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />

      {displayUrl ? (
        <div className="flex justify-center overflow-hidden rounded-lg border border-slate-300 bg-slate-100">
          <div
            onClick={() => inputRef.current?.click()}
            className="group relative cursor-pointer"
          >
            <Image
              src={displayUrl}
              alt="Product preview"
              width={80}
              height={80}
              className="size-25 rounded-lg object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              <CameraIcon className="size-6 text-white" />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center overflow-hidden rounded-lg border border-slate-300 bg-slate-100">
          <div
            onClick={() => inputRef.current?.click()}
            className="group relative cursor-pointer"
          >
            <div className="flex size-25 items-center justify-center rounded-lg bg-slate-200">
              <PhotoIcon className="size-8 text-slate-400" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              <CameraIcon className="size-6 text-white" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
