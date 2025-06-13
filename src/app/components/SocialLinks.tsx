import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedinIn, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

import Link from "next/link";
const icons = [
  { icon: faLinkedinIn, link: "https://www.linkedin.com/in/lindsayhartfiel/" },
  { icon: faGithub, link: "https://github.com/lhartfiel" },
  { icon: faEnvelope, link: "/contact" },
];
const SocialLinks = () => {
  return (
    <>
      {icons.map((data, idx) => {
        return (
          <Link
            key={`${data.icon}-${idx}`}
            href={data.link}
            target={data.link !== "/contact" ? "_blank" : ""}
            className="flex items-center justify-center rounded-full bg-tertiary mr-5 last:mr-0 sm:mr-8 w-[40px] h-[40px] transition duration-300 hover:scale-110 hover:brightness-105"
          >
            <FontAwesomeIcon
              className="text-2xl mx-1 text-primary"
              icon={data.icon}
            />
          </Link>
        );
      })}
    </>
  );
};
export { SocialLinks };
