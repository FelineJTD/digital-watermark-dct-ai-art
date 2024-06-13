"use client";

import { useState } from "react";
import { Button } from "@/components/ui";
import { Download, MagicWand } from "@phosphor-icons/react";
import Image from "next/image";
import Models from "@/data/models.json";
import Signatures from "@/data/signatures.json";

export default function Home() {
  const [image, setImage] = useState<string | null>(null);
  const [time, setTime] = useState<number | null>(null);
  const [model, setModel] = useState<number>(0);
  const [signature, setSignature] = useState<number>(0);

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

    generate(`/api/models/${Models[model].api}`, {
      signature: Signatures[signature].name,
      prompt: {
        inputs: data.get("prompt")
      }
    }).then((response) => {
      console.log(response);
      const url = URL.createObjectURL(response);
      setImage(url);
    });
  };

  const handleDownload = () => {
    if (!image) return;

    const a = document.createElement("a");
    a.href = image;
    a.download = "generated-image.png";
    a.click();
  };

  return (
    <main className="min-h-screen w-full flex-col relative bg-neutral-900 px-6 lg:px-18 xl:px-24">
      {/* BACKGROUND DECORATIVES */}
      <div className="bg-[url('/images/grain.png')] bg-repeat w-full h-full fixed top-0 left-0" />
      <Image
        src="/images/background.svg"
        alt=""
        fill
        className="object-cover fixed bottom-0 object-bottom"
      />
      {/* MAIN CONTENT */}
      <div className="flex relative z-10 min-h-screen">
        {/* PICK MODEL */}
        <div className="flex flex-col items-start min-w-fit w-60 gap-6 min-h-full">
          <div className="mx-6 h-32 w-1 bg-neutral-400" />
          <div>
            <h2 className="uppercase mb-2 text-neutral-300 tracking-wider font-bold">
              Models
            </h2>
            <div className="flex flex-col items-start">
              {Models.map((m, index) => (
                <button
                  key={index}
                  onClick={() => setModel(index)}
                  className="group py-2"
                >
                  <span
                    className={`${
                      index === model
                        ? "text-3xl text-primary font-medium"
                        : "group-hover:text-xl duration-200"
                    } `}
                  >
                    {m.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
          <div className="mx-6 h-full w-1 bg-neutral-400" />
        </div>
        {/* GENERATE */}
        <div className="flex flex-col items-center justify-center m-auto">
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
          {image ? (
            <div className="flex flex-col items-end mt-12">
              <Image
                src={image}
                alt="Generated AI image"
                width={600}
                height={600}
                className="rounded-2xl object-contain"
              />
              <div className="flex mt-6 justify-between w-full">
                <div>
                  {time && <p className="text-neutral-200">{time}ms</p>}
                </div>
                <Button
                  variant="secondary"
                  icon={<Download />}
                  onClick={handleDownload}
                >
                  Download
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center size-[600px] aspect-square bg-neutral-700/30 rounded-2xl mt-12">
              <p className="text-neutral-200">No image generated yet</p>
            </div>
          )}
        </div>
        {/* PICK SIGNATURE ALGORITHM */}
        <div className="w-60">
          <h2 className="uppercase mb-4 text-neutral-300 tracking-wider font-bold">
            Signatures
          </h2>
          <div className="flex flex-col items-end">
            {Signatures.map((s, index) => (
              <button
                key={index}
                onClick={() => setSignature(index)}
                className="group py-2"
              >
                <span
                  className={`${
                    index === signature
                      ? "text-3xl text-primary font-medium"
                      : "group-hover:text-xl duration-200"
                  } `}
                >
                  {s.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
