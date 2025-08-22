"use client";
import { FormEvent, useState } from "react";
import { ExtensionInput, createExtension } from "@/actions/actions";
import Form from "@/components/Form";
import { toast } from "sonner";
import Link from "next/link";

export default function Home() {
  const [extensionData, setExtensionData] = useState<ExtensionInput>({
    name: "",
    description: "",
    logo: null,
    isActive: false,
  });

  // submmit form data
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", extensionData.name);
    formData.append("description", extensionData.description);
    formData.append("isActive", JSON.stringify(extensionData.isActive));

    if (extensionData.logo) {
      formData.append("image", extensionData.logo);
    }

    try {
      await createExtension(formData);

      setExtensionData({
        name: "",
        description: "",
        logo: null,
        isActive: false,
      });

      toast.success("Extension created successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to create extension");
    }
  };

  return (
    <section className="h-screen flex justify-center items-center">
      <div className="w-full">
        {/* create extension form */}
        <Form
          extensionData={extensionData}
          setExtensionData={setExtensionData}
          onSubmit={handleSubmit}
          heading="Create Extension"
          btnTitle="Create Extension"
        />
        <div className="max-w-[600px] w-full flex justify-end mt-5 items-start mx-auto">
          <Link
            href="/extension"
            className="group flex items-center gap-2 px-4 py-2 rounded-[12px] bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-md transition-all duration-300 ease-in-out max-w-[220px] w-full justify-center"
          >
            Show all extensions
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white group-hover:scale-110 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h12m0 0l-4-4m4 4l-4 4"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
