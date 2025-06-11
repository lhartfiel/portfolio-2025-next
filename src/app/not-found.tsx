import Link from "next/link";
import "./globals.css";

export default function NotFound() {
  return (
    <div className="flex flex-wrap items-center justify-center min-h-[400px] text-primary">
      <div className="wrap">
        <h1 className="text-h1-sm md:text-h1 font-kanit font-medium text-center">
          Shoot!
        </h1>
        <h2 className="text-h2-sm md:text-h2 font-kanit w-full text-center">
          We were unable to find that page.
        </h2>
        <p className="text-h3-sm md:text-h3 text-center my-8">
          <Link
            className="underline underline-offset-[4px] decoration-3 transition-all duration-300 decoration-accent hover:bg-accent/25 px-[1px] py-[3px]"
            href="/"
          >
            Click here
          </Link>{" "}
          to return to the homepage
        </p>
      </div>
    </div>
  );
}
