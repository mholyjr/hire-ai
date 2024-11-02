import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { router } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { Progress } from "@/Components/ui/progress";
import { Position } from "@/types";
import { Page } from "@inertiajs/core";

interface Props {
  position: Position;
  onUploadSuccess?: (path: string) => void;
  onUploadError?: (error: string) => void;
  accept?: Record<string, string[]>;
  maxSize?: number;
}

interface PageProps {
  cv_path?: string;
  [key: string]: any;
}

export const DragDrop: React.FC<Props> = ({
  position,
  onUploadSuccess,
  onUploadError,
  accept = {
    "application/pdf": [".pdf"],
  },
  maxSize = 10485760, // 10MB
}) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      setUploading(true);
      setProgress(0);

      const formData = new FormData();
      formData.append("cv", file);

      try {
        router.post(route("candidates.store", position.slug), formData, {
          forceFormData: true,
          onProgress: progress => {
            if (progress && typeof progress.percentage === "number") {
              setProgress(Math.round(progress.percentage));
            }
          },
          onSuccess: (page: Page<PageProps>) => {
            setUploading(false);
            if (onUploadSuccess && page.props.cv_path) {
              onUploadSuccess(page.props.cv_path);
            }
          },
          onError: errors => {
            setUploading(false);
            if (onUploadError) {
              onUploadError(errors.cv || "Upload failed");
            }
          },
        });
      } catch (error) {
        setUploading(false);
        if (onUploadError) {
          onUploadError("Upload failed");
        }
      }
    },
    [position, onUploadSuccess, onUploadError],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize,
    multiple: false,
  });

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${
            isDragActive
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50"
          }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-2">
          <svg
            className="w-12 h-12 text-muted-foreground"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <div className="text-sm text-muted-foreground">
            {isDragActive ? (
              <p>Drop the CV here</p>
            ) : (
              <p>Drag & drop a CV here, or click to select</p>
            )}
          </div>
          <div className="text-xs text-muted-foreground mt-2">
            PDF up to 10MB
          </div>
        </div>
      </div>

      {uploading && (
        <div className="mt-4">
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-muted-foreground mt-2 text-center">
            Uploading... {progress}%
          </p>
        </div>
      )}
    </div>
  );
};
