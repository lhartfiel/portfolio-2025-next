import type { Metadata } from "next";
import { Gothic_A1 } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ApolloWrapper } from "./ApolloWrapper";

const gothicA1 = Gothic_A1({
  variable: "--font-gothic-a1",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"], // Specify the desired font weights
});

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
      <body
        className={`${gothicA1.variable} ${gothicA1.variable} text-primary antialiased flex flex-wrap w-full mx-auto px-0`}
      >
        <Header />
        <ApolloWrapper>
          <main className="flex flex-wrap items-center mx-auto min-h-screen py-2 max-w-screen-2xl w-full">
            {children}
          </main>
          <Footer />
        </ApolloWrapper>
      </body>
    </html>
  );
}
