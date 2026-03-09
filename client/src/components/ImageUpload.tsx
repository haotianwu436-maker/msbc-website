/**
 * Image Upload Component for Supabase Storage
 * Supports drag & drop, preview, and progress tracking
 */

import { useState, useRef } from "react";
import { Upload, X, Loader2, Image as ImageIcon } from "lucide-react";
import { uploadImage, STORAGE_BUCKETS } from "@/lib/supabase";

interface ImageUploadProps {
  bucket: keyof typeof STORAGE_BUCKETS;
  currentUrl?: string;
  onUploadComplete: (url: string) => void;
  onError?: (error: Error) => void;
  maxSizeMB?: number;
  accept?: string;
  className?: string;
}

export default function ImageUpload({
  bucket,
  currentUrl,
  onUploadComplete,
  onError,
  maxSizeMB = 5,
  accept = "image/*",
  className = "",
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentUrl || null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    // Validate file size
    if (file.size > maxSizeMB * 1024 * 1024) {
      const error = new Error(`文件大小不能超过 ${maxSizeMB}MB`);
      onError?.(error);
      return;
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      const error = new Error("请上传图片文件");
      onError?.(error);
      return;
    }

    // Show preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Upload to Supabase
    try {
      setUploading(true);
      const url = await uploadImage(file, bucket);
      onUploadComplete(url);
    } catch (err) {
      const error = err instanceof Error ? err : new Error("上传失败");
      onError?.(error);
      setPreview(currentUrl || null);
    } finally {
      setUploading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onUploadComplete("");
  };

  return (
    <div className={className}>
      {preview ? (
        <div className="relative group">
          <div className="relative aspect-video overflow-hidden rounded-lg border border-white/[0.08] bg-[#0f1729]">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
            {uploading && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-[#0066ff] animate-spin" />
              </div>
            )}
            <button
              type="button"
              onClick={handleRemove}
              disabled={uploading}
              className="absolute top-2 right-2 p-2 bg-black/70 hover:bg-black/90 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="mt-2 text-xs text-[#8b99b5] hover:text-[#0066ff] transition-colors disabled:opacity-50"
          >
            更换图片
          </button>
        </div>
      ) : (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive
              ? "border-[#0066ff] bg-[#0066ff]/10"
              : "border-white/[0.08] bg-[#0f1729] hover:border-white/[0.12]"
          } ${uploading ? "opacity-50 pointer-events-none" : "cursor-pointer"}`}
          onClick={() => !uploading && fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={handleChange}
            className="hidden"
            disabled={uploading}
          />
          {uploading ? (
            <>
              <Loader2 className="w-8 h-8 text-[#0066ff] animate-spin mx-auto mb-3" />
              <p className="text-sm text-[#8b99b5]">上传中...</p>
            </>
          ) : (
            <>
              <ImageIcon className="w-8 h-8 text-[#8b99b5] mx-auto mb-3" />
              <p className="text-sm text-[#f5f6fa] mb-1">
                点击或拖拽图片到这里
              </p>
              <p className="text-xs text-[#8b99b5]">
                最大 {maxSizeMB}MB，支持 JPG、PNG、WebP
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
