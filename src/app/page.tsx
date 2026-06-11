"use client"

import Editor from "@/components/Editor";
import Navbar from "@/components/Header";
import InfoText from "@/components/InfoText";
import { useState } from "react";

//todo, converted måste va zustand state.
// spara oxå gamla koden, lägg till knappe för att switch mellan dom med någon animation kanske
export default function Home() {
  const [converted, setConverted] = useState<boolean>(false);
  return (
    <main className="flex flex-1 flex-col">
      <Navbar />
      <div className="flex flex-col justify-center items-center gap-5">
        <InfoText />
        {!converted && <Editor />}
      </div>
    </main>
  );
}
