"use client"

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="flex justify-center">
        <Button onClick={() => console.log("hej")}>Working</Button>
      </div>
    </main>
  );
}
