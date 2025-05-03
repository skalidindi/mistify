"use client";

import React, { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const ImageUploader: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [sigma, setSigma] = useState<number>(50);
  const [base64Image, setBase64Image] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSigmaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSigma(Number(e.target.value));
  };

  const handleUpload = async (e: FormEvent) => {
    e.preventDefault();

    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("sigma", sigma.toString());

    const response = await fetch("/api/process-image", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    setBase64Image(data.base64Image);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(base64Image).then(() => {
      console.log("Base64 string copied to clipboard!");
      toast("Base64 string copied to clipboard!");
    });
  };

  return (
    <form className="max-w-md p-4" onSubmit={handleUpload}>
      <Label
        htmlFor="file-upload"
        className="block text-sm font-medium text-gray-700"
      >
        Upload Image
      </Label>
      <Input
        type="file"
        id="file-upload"
        accept="image/*"
        onChange={handleFileChange}
        className="mt-1 block w-full"
      />
      <Label
        htmlFor="size"
        className="block text-sm font-medium text-gray-700 mt-4"
      >
        Sigma (1 - 250)
      </Label>
      <Input
        type="number"
        id="size"
        value={sigma}
        onChange={handleSigmaChange}
        min={1}
        max={250}
        className="mt-1 block w-full"
      />
      <Button type="submit" className="mt-4" disabled={!file}>
        Process Image
      </Button>
      {base64Image && (
        <div className="mt-8">
          <div className="flex items-center justify-between">
            <Label className="font-medium text-gray-700">Resulting Image</Label>

            <Button onClick={handleCopy} size="sm" variant="secondary">
              Copy as Base64 String
            </Button>
          </div>

          {/* eslint-disable @next/next/no-img-element */}
          <img src={base64Image} alt="Processed Image" className="mt-2" />
        </div>
      )}
    </form>
  );
};

export default ImageUploader;
