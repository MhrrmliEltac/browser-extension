import {
  deleteExtension,
  Extension,
  getExtension,
  Response,
  updateActiveExtension,
  updateExtension,
} from "@/actions/actions";
import { create } from "zustand";

interface ExtensionStore {
  extensions: Extension[];
  filteredExtension: Extension[];
  loading: boolean;

  fetchExtension: () => Promise<void>;
  updateExtension: (
    id: string,
    formData: FormData
  ) => Promise<{ message: string; updatedExtension: Extension } | undefined>;
  updateActiveExtension: (id: string, isActive: boolean) => Promise<any>;
  deleteExtension: (
    id: string
  ) => Promise<{ message: string; deletedExtension: Extension } | undefined>;
  sortedExtension: (tab: string) => void;
}

export const useExtensionStore = create<ExtensionStore>((set, get) => ({
  extensions: [],
  filteredExtension: [],
  loading: false,

  fetchExtension: async () => {
    set({ loading: true });
    const response = await getExtension();
    if (response?.extension) {
      set({
        extensions: response?.extension,
        filteredExtension: response.extension,
        loading: false,
      });
    }
  },
  updateExtension: async (
    id: string,
    formData: FormData
  ): Promise<{ message: string; updatedExtension: Extension } | undefined> => {
    const response = await updateExtension(id, formData);
    const updatedExtensions = get().extensions.map((ext) =>
      ext.id === id ? { ...ext, ...formData } : ext
    );
    set(() => ({
      extensions: updatedExtensions,
      filteredExtension: updatedExtensions,
    }));
    return response;
  },

  updateActiveExtension: async (
    id: string,
    isActive: boolean
  ): Promise<any> => {
    const response = await updateActiveExtension(id, isActive);
    const updatedExtensions = get().extensions.map((ext) =>
      ext.id === id ? { ...ext, isActive } : ext
    );
    set(() => ({
      extensions: updatedExtensions,
      filteredExtension: updatedExtensions,
    }));
    return response;
  },

  deleteExtension: async (
    id: string
  ): Promise<{ message: string; deletedExtension: Extension } | undefined> => {
    const response = await deleteExtension(id);
    set((state: ExtensionStore) => ({
      extensions: state.extensions.filter((ext: Extension) => ext.id !== id),
      filteredExtension: state.filteredExtension.filter(
        (ext: Extension) => ext.id !== id
      ),
    }));
    return response;
  },

  sortedExtension: (tab: string) => {
    const { extensions } = get();

    if (tab === "all") {
      set(() => ({
        filteredExtension: extensions,
      }));
    } else {
      set(() => ({
        filteredExtension: extensions.filter(
          (ext) => ext.isActive.toString() === tab
        ),
      }));
    }
  },
}));
