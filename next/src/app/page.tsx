"use client";

import { Button } from "@/components/ui";
import { MagicWand } from "@phosphor-icons/react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    async function query(data: any) {
      const response = await fetch("/api/models/stable-diffusion", {
        headers: {
          Authorization: "Bearer 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"
        },
        method: "POST",
        body: JSON.stringify(data)
      });

      const result = await response.blob();
      return result;
    }

    query({ inputs: "A rare pokemon" }).then((response) => {
      console.log(response);
      const url = URL.createObjectURL(response);
      console.log(url);
      setImage(url);
    });
  }, []);

  return (
    <main className="min-h-screen w-full flex-col relative bg-neutral-900">
      {/* BACKGROUND DECORATIVES */}
      <div className="bg-[url('/images/grain.png')] bg-repeat w-full h-full fixed top-0 left-0" />
      <Image
        src="/images/background.svg"
        alt=""
        fill
        className="object-cover fixed bottom-0"
      />
      {/* MAIN CONTENT */}
      <div className="flex">
        {/* PICK MODEL */}
        <div></div>
        {/* GENERATE */}
        <div className="relative z-10 flex flex-col items-center justify-center">
          <form className="w-full">
            <div className="flex w-full">
              <input
                type="text"
                placeholder="Enter a prompt"
                className="p-2 w-full bg-neutral-50 placeholder:text-neutral-500"
              />
              <Button
                type="submit"
                variant="primary"
                className="ml-6"
                icon={<MagicWand />}
              >
                Generate
              </Button>
            </div>
          </form>
          {image && (
            <Image
              src={image}
              alt="Generated AI image"
              width={600}
              height={400}
              className="rounded-2xl mt-12 object-contain"
            />
          )}
        </div>
      </div>
    </main>
  );
}
