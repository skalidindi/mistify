import ImageUploader from "@/components/ImageUploader";
import { Toaster } from "sonner";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50">
      <header className="my-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800">Mistify</h1>
        <p className="text-lg text-gray-600 mt-2">
          Easily upload and blur your images with a single click!
        </p>
      </header>
      <ImageUploader />
      <Toaster />
    </div>
  );
}
