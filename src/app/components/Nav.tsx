import Link from "next/link";

const Nav = () => {
  return (
    <nav className="flex justify-evenly items-center py-4 text-gray-800 w-full">
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/development">Development</Link>
      <Link href="/ux">UX</Link>
      <Link href="/blog">Blog</Link>
      <Link href="/contact">Contact</Link>
    </nav>
  );
};

export default Nav;
