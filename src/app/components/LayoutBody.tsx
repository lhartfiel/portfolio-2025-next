"use client";
import { Gothic_A1 } from "next/font/google";
import Header from "./Header";
import Footer from "./Footer";
import { ApolloWrapper } from "../ApolloWrapper";
import { useContext } from "react";
import { MobileNavContext } from "./NavContext";

const gothicA1 = Gothic_A1({
  variable: "--font-gothic-a1",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"], // Specify the desired font weights
});

const LayoutBody = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const mobileNavIsActive = useContext(MobileNavContext);
  return (
    <div
      className={`overflow-x-hidden transition delay-75 ${gothicA1.variable} ${
        gothicA1.variable
      } ${
        mobileNavIsActive ? "fixed min-h-screen" : "relative bg-white"
      } text-primary antialiased flex flex-wrap w-full mx-auto px-0`}
    >
      <div
        className={`fixed top-0 right-0 bottom-0 w-full h-screen bg-primary transform transition-transform duration-300 ease-in-out overflow-y-auto ${
          mobileNavIsActive ? " translate-x-0 -z-0" : "translate-x-full -z-50"
        }`}
      ></div>
      <Header />
      <ApolloWrapper>
        <main
          className={`flex flex-wrap items-center mx-auto min-h-screen py-2 max-w-screen-2xl w-full`}
        >
          {children}
        </main>
        <Footer />
      </ApolloWrapper>
    </div>
  );
};

export default LayoutBody;
