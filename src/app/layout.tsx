import type { Metadata } from "next";
import "./globals.css";
import { MobileNavProvider } from "./components/Header/NavContext";
import { LayoutBody } from "./components/LayoutBody";
import { GoogleTrackingScript } from "./GoogleTracking";

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
      <GoogleTrackingScript />
      <MobileNavProvider>
        <body>
          <LayoutBody>{children}</LayoutBody>
        </body>
      </MobileNavProvider>
    </html>
  );
}
