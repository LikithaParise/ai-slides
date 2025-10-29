import "./globals.css";
import React from "react";

export const metadata = {
  title: "AI Slides Demo",
  description: "Demo app for AI-generated slides (pptxgenjs)",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: 20 }}>{children}</div>
      </body>
    </html>
  );
}
