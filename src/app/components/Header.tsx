import Nav from "./Nav";
import Link from "next/link";
const Header = () => {
  return (
    <header className="flex justify-center w-full mx-auto">
      <div className="flex justify-between items-center max-w-screen-2xl w-full">
        <Link
          href="/"
          className="logo flex items-center min-w-[80px] lg:min-w-[250px]"
        >
          LH
        </Link>
        <Nav />
      </div>
    </header>
  );
};
export default Header;
