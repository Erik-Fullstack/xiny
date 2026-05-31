"use client"

import Editor from "@/components/Editor/Editor";
import Navbar from "@/components/Header";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Navbar />
      <div className="flex flex-col justify-center items-center gap-5">
        <Editor />
      </div>
    </main>
  );
}
