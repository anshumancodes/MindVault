import type { Metadata } from "next";

import "./globals.css";


export const metadata: Metadata = {
  title: "MindVault",
  description: "MindVault : Your AI-Powered Second Brain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        
      >
        {children}
      </body>
    </html>
  );
}
