import React from "react";
import ClientSection from "@/app/ClientSection";

export default function Home() {
    return (
        <main className="flex h-screen w-full flex-col items-center text-center">
            <div className="top-header">ChatGPT Website v.2.2</div>
            <ClientSection />
        </main>
    );
}