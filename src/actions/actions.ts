"use server";
import axios, { AxiosError } from "axios";

export interface Extension {
  id: string;
  name: string;
  description: string;
  logo: string;
  isActive: boolean;
}

export type ExtensionInput = {
  name: string;
  description: string;
  logo: File | null;
  isActive: boolean;
};

export interface Response {
  message: string;
  error: unknown;
  extension: Extension[];
}

// get extension data in server
export const getExtension = async (): Promise<Response | undefined> => {
  try {
    const response = await axios.get("http://localhost:5000/extension");

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data.message;
    }
    console.log(error);
  }
};

// create extension data in server
export const createExtension = async (
  extensionData: FormData
): Promise<Response | undefined> => {
  try {
    const response = await axios.post(
      "http://localhost:5000/extension/create",
      extensionData
    );

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data.message;
    }
    console.log(error);
  }
};

// update extension data in server
export const updateExtension = async (
  id: string,
  extensionData: FormData
): Promise<{ message: string; updatedExtension: Extension } | undefined> => {
  try {
    const response = await axios.put(`http://localhost:5000/extension/${id}`, {
      name: extensionData.get("name"),
      description: extensionData.get("description"),
      isActive: extensionData.get("isActive"),
    });

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data.message;
    }
    console.log(error);
  }
};

// update extension active status in server
export const updateActiveExtension = async (
  id: string,
  isActive: boolean
): Promise<Response | undefined> => {
  try {
    const response = await axios.put(
      `http://localhost:5000/extension/${id}/active`,
      {
        isActive: isActive,
      }
    );
    console.log("Response from updateActiveExtension:", response);

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data.message;
    }
    console.log(error);
  }
};

// delete extension data in server
export const deleteExtension = async (
  id: string
): Promise<{ message: string; deletedExtension: Extension } | undefined> => {
  try {
    const response = await axios.delete(
      `http://localhost:5000/extension/${id}`
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data.message;
    }
    console.log(error);
  }
};
