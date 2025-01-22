"use client";

import React, { useRef, useState } from "react";
import { IKImage, ImageKitProvider, IKUpload, IKVideo } from "imagekitio-next";
import config from "@/lib/config";
import Image from "next/image";
import { toast } from "@/hooks/use-toast";
import { capitalize, cn } from "@/lib/utils";

const {
  env: {
    apiEndpoint,
    imageKit: { urlEndpoint, publicKey },
  },
} = config;

const authenticator = async () => {
  try {
    const response = await fetch(`${apiEndpoint}/api/auth/imagekit`);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Authentication failed with status ${response.status}: ${errorText}`,
      );
    }

    const data = await response.json();
    const { signature, expire, token } = data;

    return { signature, expire, token };
  } catch (error: any) {
    throw new Error(`Authentication failed: ${error.message}`);
  }
};

interface Props {
  type: "IMAGE" | "VIDEO";
  accept: string;
  placeholder: string;
  folder: string;
  variant: "DARK" | "LIGHT";
  onFileChange: (filePath: string) => void;
  value?: string;
}

const FileUpload = ({
  type,
  accept,
  placeholder,
  folder,
  variant,
  onFileChange,
  value,
}: Props) => {
  const ikUploadRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string } | null>(null);
  const [progress, setProgress] = useState(0);
  const styles = {
    button: variant === "DARK" ? "bg-dark-300" : "bg-light-600",
    placeholder: variant === "DARK" ? "text-light-100" : "text-slate-500",
    text: variant === "DARK" ? "text-light-100" : "text-dark-400",
  };

  const onError = (error: any) => {
    console.log("Error", error);

    toast({
      title: `${capitalize(type)} Upload Failed`,
      description: `Your ${type.toLowerCase()} could not be uploaded. Please try again.`,
      variant: "destructive",
    });
  };

  const onSuccess = (res: any) => {
    setFile(res);
    onFileChange(res.filePath);

    toast({
      title: `${capitalize(type)} Uploaded Successfully`,
      description: `Your ${type.toLowerCase()} has been uploaded successfully.`,
    });
  };

  const onValidate = (file: File) => {
    if (type === "IMAGE") {
      if (file.size > 1024 * 1024 * 20) {
        toast({
          title: "File Size Too Large",
          description: "Please upload a file less than 20MB.",
          variant: "destructive",
        });

        return false;
      }
    } else if (type === "VIDEO") {
      if (file.size > 1024 * 1024 * 50) {
        toast({
          title: "File Size Too Large",
          description: "Please upload a file less than 50MB.",
          variant: "destructive",
        });

        return false;
      }
    }

    return true;
  };

  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        ref={ikUploadRef}
        onError={onError}
        onSuccess={onSuccess}
        useUniqueFileName
        validateFile={onValidate}
        onUploadStart={() => setProgress(0)}
        onUploadProgress={({ loaded, total }) => {
          const percentage = Math.round((loaded / total) * 100);
          setProgress(percentage);
        }}
        folder={folder}
        accept={accept}
        className="hidden"
      />

      <button
        className={cn("upload-btn", styles.button)}
        onClick={(e) => {
          e.preventDefault();

          if (ikUploadRef.current) {
            // @ts-ignore
            ikUploadRef.current.click();
          }
        }}
      >
        <Image
          src="/icons/upload.svg"
          alt="upload icon"
          width={20}
          height={20}
          className="object-contain"
        />

        <p className={cn("text-base", styles.placeholder)}>{placeholder}</p>

        {file && (
          <p className={cn("upload-filename", styles.text)}>{file.filePath}</p>
        )}
      </button>

      {progress > 0 && progress !== 100 && (
        <div className="w-full rounded-full bg-green-200">
          <div className="progress" style={{ width: `${progress}%` }}>
            {progress}%
          </div>
        </div>
      )}

      {file &&
        (type === "IMAGE" ? (
          <IKImage
            alt={file.filePath}
            path={file.filePath}
            width={500}
            height={300}
          />
        ) : type === "VIDEO" ? (
          <IKVideo
            path={file.filePath}
            controls={true}
            className="h-96 w-full rounded-xl"
          />
        ) : null)}
    </ImageKitProvider>
  );
};

export default FileUpload;
