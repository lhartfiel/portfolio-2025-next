import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faFolderTree,
  faShield,
} from "@fortawesome/free-solid-svg-icons";

const roleIcon = (
  <FontAwesomeIcon icon={faFolderTree} className="text-tertiary mr-2" />
);
const durationIcon = (
  <FontAwesomeIcon icon={faClock} className="text-tertiary mr-2" />
);
const typeIcon = (
  <FontAwesomeIcon icon={faShield} className="text-tertiary mr-2" />
);

const UxDetails = ({
  role,
  duration,
  type,
}: {
  role: string;
  duration: string;
  type: string;
}) => {
  const details = [
    {
      name: "Role",
      content: role,
      icon: roleIcon,
    },
    {
      name: "Duration",
      content: duration,
      icon: durationIcon,
    },
    {
      name: "Type",
      content: type,
      icon: typeIcon,
    },
  ];
  return (
    <div className="flex flex-nowrap justify-between md:items-start md:justify-center py-4 px-6 bg-primary w-full text-h4 md:text-h3-sm">
      {details.map((detail) => (
        <div
          key={detail.name}
          className="flex flex-nowrap items-start sm:w-1/3 lg:w-auto icon text-white mr-2 md:mr-8"
        >
          {detail.icon}{" "}
          <span className="flex flex-wrap ">
            <p className="font-semibold pr-2">{detail.name}: </p>{" "}
            {detail.content}
          </span>
        </div>
      ))}
    </div>
  );
};

export { UxDetails };
