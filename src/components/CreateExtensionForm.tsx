"use client";

import { createExtension, ExtensionInput } from "@/actions/actions";
import React, { FormEvent, useActionState, useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import Link from "next/link";
import { toast } from "sonner";

type OmitInput = Omit<ExtensionInput, "isActive">;

const CreateExtensionForm = () => {
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

        const response = await createExtension(formData);
        console.log(response)

        setExtensionData({
            name: "",
            description: "",
            logo: null,
            isActive: false,
        });

        toast.success("Extension created successfully!")

    };

    // change extension name and description
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        const key = name as keyof OmitInput;

        setExtensionData((prev) => ({ ...prev, [key]: value }));
    };

    // change checkbox for extension active or deactive
    const handleCheckboxChange = (checked: boolean) => {
        setExtensionData((prev: ExtensionInput) => ({
            ...prev,
            isActive: checked,
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files;

        if (file) {
            setExtensionData((prev: ExtensionInput) => ({ ...prev, logo: file[0] }));
        }
    };

    return (
        <section className="h-screen flex justify-center items-center">
            <div className="w-full">
                <form
                    onSubmit={handleSubmit}
                    className="max-w-[600px] w-full flex flex-col gap-5 mx-auto bg-white p-3 rounded-[12px]"
                >
                    <h5 className="font-medium text-2xl text-neutral-900">
                        Create Extension
                    </h5>

                    <Input
                        placeholder="Extension name"
                        id="name"
                        name="name"
                        required
                        value={extensionData.name}
                        onChange={handleChange}
                        className="h-[50px]"
                    />

                    <Textarea
                        placeholder="Extension description"
                        id="description"
                        name="description"
                        required
                        value={extensionData.description}
                        onChange={handleChange}
                    />

                    <div className="flex items-center gap-3">
                        <Checkbox
                            id="status"
                            checked={extensionData.isActive}
                            onCheckedChange={handleCheckboxChange}
                        />
                        <Label htmlFor="status">Extension active</Label>
                    </div>

                    <div className="flex flex-col gap-1">
                        <Label htmlFor="logo">Extension logo</Label>
                        <Input
                            type="file"
                            id="logo"
                            name="logo"
                            required
                            onChange={handleFileChange}
                            className="h-[50px]"
                        />
                    </div>

                    <button
                        type="submit"
                        onSubmit={handleSubmit}
                        className="w-full cursor-pointer border border-neutral-500 rounded-[8px] shadow-md bg-primary text-white font-noto-sans"
                    >
                        Extension yarat
                    </button>
                </form>

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
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h12m0 0l-4-4m4 4l-4 4" />
                        </svg>
                    </Link>
                </div>

            </div>



        </section>
    );
};

export default CreateExtensionForm;
