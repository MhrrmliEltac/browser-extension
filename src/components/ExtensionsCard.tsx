"use client";
import { Extension, ExtensionInput } from "@/actions/actions";
import Image from "next/image";
import React, { FormEvent, useEffect, useState } from "react";
import Switch from "./Switch";
import { useExtensionStore } from "@/store/extensionStore";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import Form from "./Form";
import { DialogTitle } from "@radix-ui/react-dialog";
import { toast } from "sonner";
import { AxiosError } from "axios";

const ExtensionsCard: React.FC<Extension> = ({
  id,
  name,
  description,
  logo,
  isActive,
}) => {
  const { updateExtension, updateActiveExtension, deleteExtension } =
    useExtensionStore();
  const [extensionData, setExtensionData] = useState<ExtensionInput>({
    name: "",
    description: "",
    logo: null,
    isActive: false,
  });
  const [active, setActive] = useState<boolean>(isActive);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleToggle = async () => {
    try {
      const newActiveState = !active;
      setActive(newActiveState);
      await updateActiveExtension(id, newActiveState);
    } catch (error) {
      console.error("Error toggling extension:", error);
    }
  };

  const handleRemove = async () => {
    try {
      const response = await deleteExtension(id);
      if (response?.message) {
        toast.success(response.message);
      }
    } catch (error) {
      console.error("Error removing extension:", error);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", extensionData.name);
    formData.append("description", extensionData.description);
    formData.append("isActive", JSON.stringify(extensionData.isActive));
    if (extensionData.logo) {
      formData.append("logo", extensionData.logo);
    }

    try {
      const response = await updateExtension(id, formData);

      if (response?.message) {
        toast.success(response.message);
        setExtensionData({
          name: "",
          description: "",
          logo: null,
          isActive: false,
        });
        setIsOpen(false);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data?.message || "Failed to update extension"
        );
      }
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="max-w-[400px] min-h-[200px] flex flex-col items-start justify-between w-full rounded-[12px] border border-neutral-300 p-3 bg-white hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start gap-4 w-full">
        <Image
          src={logo}
          alt={`${name}-logo`}
          width={50}
          height={50}
          quality={90}
        />
        <div className="flex flex-col gap-1">
          <h4 className="font-bold text-neutral-900">{name}</h4>
          <p className="font-normal text-neutral-500">{description}</p>
        </div>
      </div>
      <div className="flex justify-between w-full">
        <div className="flex items-center gap-2">
          <button
            className="border border-neutral-300 rounded-full px-3 py-1 cursor-pointer text-sm"
            onClick={handleRemove}
          >
            Remove
          </button>

          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <button
                onClick={() => setIsOpen(true)}
                className="border border-neutral-300 rounded-full px-3 py-1 cursor-pointer text-sm"
              >
                Update
              </button>
            </DialogTrigger>
            {/* Dialog content for updating extension */}
            <DialogContent>
              <DialogTitle className="text-lg font-semibold mb-4"></DialogTitle>
              <Form
                extensionData={extensionData}
                setExtensionData={setExtensionData}
                onSubmit={handleSubmit}
                heading="Update Extension"
                btnTitle="Update Extension"
              />
            </DialogContent>
          </Dialog>
        </div>
        <Switch label="" onToggle={handleToggle} isOn={active} />
      </div>
    </div>
  );
};

export default ExtensionsCard;
