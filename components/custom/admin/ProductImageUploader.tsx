"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import { useDropzone, FileRejection } from "react-dropzone";
import { toast } from "sonner";
import { v4 as uuidV4 } from "uuid";

interface FileImage {
  id: string;
  file: File;
  uploading: boolean;
  progress: number;
  key?: string;
  isDeleteing: boolean;
  error: boolean;
  objectUrl?: string;
  uploadedUrlOrKey?: string; // ✅ Add this
}

interface ProductImageUploaderProps {
  onUploadSuccess: (data: {
    previewUrl: string;
    uploadedUrlOrKey: string;
  }) => void;
  onDelete?: () => void;
}

const ProductImageUploader: React.FC<ProductImageUploaderProps> = ({
  onUploadSuccess,
  onDelete,
}) => {
  const [file, setFile] = useState<FileImage | null>(null);

  const removeFile = async () => {
    if (file?.objectUrl) {
      URL.revokeObjectURL(file.objectUrl);
    }

    if (file?.key) {
      try {
        const res = await fetch("/api/s3/delete", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ key: file.key }),
        });

        if (!res.ok) {
          throw new Error("Delete request failed");
        }

        toast.success("File deleted successfully.");
      } catch (error) {
        console.error("Failed to delete from S3:", error);
        toast.error("Failed to delete file from storage.");
      }
    } else {
      toast.info("File removed locally.");
    }

    setFile(null);
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const droppedFile = acceptedFiles[0];
    if (!droppedFile) return;

    const objectUrl = URL.createObjectURL(droppedFile);
    const id = uuidV4();

    const fileData: FileImage = {
      id,
      file: droppedFile,
      uploading: true,
      progress: 0,
      objectUrl,
      error: false,
      isDeleteing: false,
    };

    setFile(fileData);

    try {
      // 🔹 Step 1: Get presigned URL
      const presignRes = await fetch("/api/s3/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fileName: droppedFile.name,
          contentType: droppedFile.type,
          size: droppedFile.size,
        }),
      });

      if (!presignRes.ok) {
        throw new Error("Failed to get presigned URL");
      }

      const { presignedUrl, key } = await presignRes.json();

      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const progress = Math.round((event.loaded / event.total) * 100);
            setFile((prev) => (prev ? { ...prev, progress } : prev));
          }
        };

        xhr.onload = () => {
          if (xhr.status === 200 || xhr.status === 204) {
            setFile((prev) =>
              prev
                ? {
                    ...prev,
                    uploading: false,
                    error: false,
                    key,
                    progress: 100,
                    uploadedUrlOrKey: `${process.env.NEXT_PUBLIC_TIGRIS_PUBLIC_BASE_URL}/${key}`, // ✅ store it
                  }
                : prev
            );

            toast.success("Upload successful!");
            onUploadSuccess({
              previewUrl: objectUrl,
              uploadedUrlOrKey: `${process.env.NEXT_PUBLIC_TIGRIS_PUBLIC_BASE_URL}/${key}`,
            });
            resolve();
          } else {
            toast.error("Upload failed with status " + xhr.status);
            setFile((prev) =>
              prev
                ? {
                    ...prev,
                    uploading: false,
                    error: true,
                    progress: 0,
                  }
                : prev
            );
            reject();
          }
        };

        xhr.onerror = () => {
          toast.error("Network error during upload.");
          setFile((prev) =>
            prev
              ? {
                  ...prev,
                  uploading: false,
                  error: true,
                  progress: 0,
                }
              : prev
          );
        };
        xhr.open("PUT", presignedUrl, true);
        xhr.setRequestHeader("Content-Type", droppedFile.type);
        xhr.send(droppedFile);
      });
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Upload failed. Please try again.");
      setFile((prev) =>
        prev
          ? {
              ...prev,
              uploading: false,
              error: true,
              progress: 0,
            }
          : prev
      );
    }
  }, []);
  const onDropRejected = useCallback((fileRejections: FileRejection[]) => {
    const tooManyFiles = fileRejections.find(
      (rej) => rej.errors[0].code === "too-many-files"
    );
    const fileTooLarge = fileRejections.find(
      (rej) => rej.errors[0].code === "file-too-large"
    );

    if (tooManyFiles) toast.error("Only 1 file allowed.");
    if (fileTooLarge) toast.error("Max file size is 5MB.");
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024,
    accept: {
      "image/*": [],
    },
  });
  return (
    <>
      <Card
        {...getRootProps()}
        className={cn(
          "relative border-2 border-dashed transition-colors duration-200 ease-in-out w-full h-72",
          isDragActive
            ? "border-primary bg-primary/10 border-solid"
            : "border-border hover:border-primary",
          file
            ? "pointer-events-none opacity-50 bg-muted cursor-not-allowed"
            : ""
        )}
      >
        <CardContent className="flex flex-col items-center justify-center h-full w-full">
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <div className="flex flex-col items-center justify-center h-full w-full gap-y-3">
              <p>Drag &quot;n&quot; drop some files here, or click to select files</p>
              <Button type="button">Select Files</Button>
            </div>
          )}
        </CardContent>
      </Card>

      {file && (
        <div className="mt-4 flex items-center gap-4">
          <div className="relative w-32 h-32">
            {file.objectUrl && (
              <Image
                src={file.objectUrl}
                alt="Uploaded preview"
                className="w-full h-full object-cover rounded-md border"
                fill
              />
            )}
            <Button
              size="icon"
              type="button"
              variant="destructive"
              className="absolute -top-2 -right-2 w-6 h-6"
              onClick={removeFile}
            >
              ×
            </Button>
          </div>
          <div>
            <p className="text-sm font-medium truncate">{file.file.name}</p>
            <p className="text-xs text-muted-foreground">
              {(file.file.size / 1024).toFixed(2)} KB
            </p>
          </div>
        </div>
      )}

      {file?.uploading && !file.isDeleteing && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <p className="text-white font-medium text-lg">{file.progress}%</p>
        </div>
      )}

      {file?.error && (
        <div className="absolute inset-0 bg-red-500/50 flex items-center justify-center">
          <p className="text-red-500 font-medium text-lg">Error</p>
        </div>
      )}
    </>
  );
};

export default ProductImageUploader;
