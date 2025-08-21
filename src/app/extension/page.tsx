"use client";
import { Extension } from "@/actions/actions";
import Button from "@/components/Button";
import ExtensionsCard from "@/components/ExtensionsCard";
import { useExtensionStore } from "@/store/extensionStore";
import { useEffect } from "react";

export default function Page() {
    const { filteredExtension, fetchExtension } = useExtensionStore();

    useEffect(() => {
        fetchExtension();
    }, []);

    return (
        <section className="max-w-[1200px] px-10 mx-auto place-items-center py-20">
            {/* Extension hading */}
            <div className="w-full flex items-center justify-between mb-5">
                <h1 className="text-3xl font-bold font-noto-sans">Extension List</h1>
                <Button />
            </div>
            {/* Extension card */}
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 transition-all duration-300">
                {filteredExtension &&
                    filteredExtension.length > 0 &&
                    filteredExtension.map((ext: Extension) => (
                        <ExtensionsCard
                            id={ext.id}
                            name={ext.name}
                            description={ext.description}
                            logo={ext.logo}
                            isActive={ext.isActive}
                            key={ext.id}
                        />
                    ))}
            </div>
        </section>
    );
}
