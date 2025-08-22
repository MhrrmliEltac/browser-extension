import { ExtensionInput } from "@/actions/actions";
import React, { Dispatch, FormEvent, SetStateAction } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

export type OmitInput = Omit<ExtensionInput, "isActive">;

const Form = ({
  extensionData,
  setExtensionData,
  onSubmit,
  heading,
  btnTitle,
}: {
  extensionData: ExtensionInput;
  setExtensionData: Dispatch<SetStateAction<ExtensionInput>>;
  onSubmit: (e: FormEvent) => void;
  heading: string;
  btnTitle: string;
}) => {
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
    <form
      onSubmit={onSubmit}
      className="max-w-[600px] w-full flex flex-col gap-5 mx-auto bg-white p-3 rounded-[12px]"
    >
      <h5 className="font-medium text-2xl text-neutral-900">{heading}</h5>

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
        onSubmit={onSubmit}
        className="w-full cursor-pointer border border-neutral-500 rounded-[8px] shadow-md bg-primary text-white font-noto-sans"
      >
        {btnTitle}
      </button>
    </form>
  );
};

export default Form;
