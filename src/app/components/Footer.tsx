import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLinkedinIn, faGithub } from "@fortawesome/free-brands-svg-icons";

const heartIcon = <FontAwesomeIcon icon={faHeart} className="w-4 mx-1" />;
const icons = [faLinkedinIn, faGithub, faEnvelope];

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-primary text-white text-center py-[46px] w-full">
      <div className="max-w-screen-2xl mx-auto grid grid-cols-3 grid-start-1 gap-4 items-center justify-center">
        <div className="social flex flex-nowrap justify-center col-start-2 md:col-start-1 col-span-1">
          {icons.map((icon) => {
            return (
              <span className="flex items-center justify-center rounded-full bg-tertiary mr-5 last:mr-0 sm:mr-8 w-[40px] h-[40px]">
                <FontAwesomeIcon
                  className="w-5 mx-1 text-primary"
                  icon={icon}
                />
              </span>
            );
          })}
        </div>
        <div className="copyright col-start-1 col-span-3 md:col-start-2 md:col-span-1">
          <p className="text-intro-min">
            &copy; Lindsay Hartfiel {currentYear}
          </p>
          <p className="flex flex-nowrap justify-center text-[12px]">
            Designed & Developed with {heartIcon} by yours truly
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
