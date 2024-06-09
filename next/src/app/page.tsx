"use client";

import { Button } from "@/components/ui";
import { Download, MagicWand } from "@phosphor-icons/react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [image, setImage] = useState<string | null>(null);
  const [time, setTime] = useState<number | null>(null);

  async function generate(api: string, body: any) {
    const start = Date.now();
    const response = await fetch(api, {
      method: "POST",
      body: JSON.stringify(body)
    });

    const result = await response.blob();
    const end = Date.now();
    setTime(end - start);
    return result;
  }

  const handleSubmission = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    generate("/api/models/stable-diffusion", {
      inputs: data.get("prompt")
    }).then((response) => {
      const url = URL.createObjectURL(response);
      setImage(url);
    });
  };

  useEffect(() => {
    async function query(data: any) {
      const response = await fetch("/api/models/stable-diffusion", {
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
          <form className="flex w-full" onSubmit={handleSubmission}>
            <input
              type="text"
              name="prompt"
              placeholder="Enter a prompt"
              className="p-2 w-full bg-neutral-50 placeholder:text-neutral-500 text-neutral-900 focus:outline-none focus:ring-0 focus:border-primary border-2 border-neutral-50"
            />
            <Button
              type="submit"
              variant="primary"
              className="ml-6"
              icon={<MagicWand />}
            >
              Generate
            </Button>
          </form>
          {image && (
            <div className="flex flex-col items-end">
              <Image
                src={image}
                alt="Generated AI image"
                width={600}
                height={400}
                className="rounded-2xl mt-12 object-contain"
              />
              <div className="flex mt-6 justify-between w-full">
                <div>
                  {time && <p className="text-neutral-200">{time}ms</p>}
                </div>
                <Button
                  variant="secondary"
                  icon={<Download />}
                  // onClick={() => setImage(null)}
                >
                  Download
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
