import {
  deleteExtension,
  Extension,
  getExtension,
  updateExtension,
} from "@/actions/actions";
import { create } from "zustand";

interface ExtensionStore {
  extensions: Extension[];
  filteredExtension: Extension[];
  loading: boolean;
  fetchExtension: () => Promise<void>;
  updateExtension: (id: string, isActive: boolean) => Promise<void>;
  deleteExtension: (id: string) => Promise<void>;
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
  updateExtension: async (id: string, isActive: boolean) => {
    await updateExtension(id, isActive);
    set((state: ExtensionStore) => ({
      extensions: state.extensions.map((ext: Extension) =>
        ext.id === id ? { ...ext, isActive } : ext
      ),
    }));
  },

  deleteExtension: async (id: string) => {
    await deleteExtension(id);
    set((state: ExtensionStore) => ({
      extensions: state.extensions.filter((ext: Extension) => ext.id !== id),
    }));
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
