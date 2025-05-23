import type { Metadata } from "next";
import "./globals.css";
import { MobileNavProvider } from "./components/NavContext";
import LayoutBody from "./components/LayoutBody";

export const metadata: Metadata = {
  title: "Lindsay Hartfiel Portfolio",
  description: "Frontend Developer and UX Designer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <MobileNavProvider>
        <body>
          <LayoutBody children={children} />
        </body>
      </MobileNavProvider>
    </html>
  );
}
