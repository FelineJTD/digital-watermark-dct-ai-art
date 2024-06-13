import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Generate AI Art with Signatures",
  description: "Generate AI art which can be verified with a signature."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="selection:bg-primary selection:text-neutral-900">
        {children}
      </body>
    </html>
  );
}
