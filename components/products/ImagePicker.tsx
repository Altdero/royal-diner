"use client";

import Image from "next/image";
import { CameraIcon } from "@heroicons/react/24/outline";
import { CldUploadWidget } from "next-cloudinary";
import { Button } from "@/components/ui/Button";
import { getImagePath } from "@/src/lib/utils/getImagePath";

interface ImagePickerProps {
  value?: string;
  onChange: (value: string) => void;
}

export function ImagePicker({ value, onChange }: ImagePickerProps) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-stone-700">Image</span>

      <CldUploadWidget
        uploadPreset="royal_diner"
        onSuccess={(result) => {
          if (
            result.info &&
            typeof result.info === "object" &&
            "secure_url" in result.info
          ) {
            onChange(result.info.secure_url);
          }
        }}
        options={{ maxFiles: 1 }}
      >
        {({ open }) =>
          value ? (
            <div className="flex justify-center overflow-hidden rounded-lg border border-slate-300">
              <div
                onClick={() => open()}
                className="group relative cursor-pointer"
              >
                <Image
                  src={getImagePath(value)}
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
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => open()}
            >
              Upload Image
            </Button>
          )
        }
      </CldUploadWidget>
    </div>
  );
}
