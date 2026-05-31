"use client"

import Editor from "@/components/Editor";
import Navbar from "@/components/Header";
import InfoText from "@/components/InfoText";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Navbar />
      <div className="flex flex-col justify-center items-center gap-5">
        <InfoText/>
        <Editor />
      </div>
    </main>
  );
}
