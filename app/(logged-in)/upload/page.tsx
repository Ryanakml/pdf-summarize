import UploadHeader from "@/components/upload/upload-header";
import UploadForm from "@/components/upload/upload-form";

export default function UploadPage() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 sm:py-32">
      <div className="max-w-4xl w-full text-center space-y-10">
        <UploadHeader />
        <UploadForm />
      </div>
    </section>
  );
}