import type { Metadata, Viewport } from "next";
import "./globals.css";
import { CheckoutProvider } from "@/context/CheckoutContext";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "Ecoyaan Assignment",
  description: "Eco-friendly shopping platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-[DM_Sans] antialiased bg-[#f7f4ef] text-neutral-900">
        <CheckoutProvider>{children}</CheckoutProvider>
      </body>
    </html>
  );
}
