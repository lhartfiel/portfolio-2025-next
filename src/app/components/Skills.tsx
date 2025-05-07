import parse from "html-react-parser";
import { GET_ALL_SKILLS } from "src/app/apis/schema";
import { getClient } from "src/app/ApolloClient";

type skill = {
  heading: "string";
  description: "string";
  icon: {
    type: "string";
    className: "string";
  };
};
export const Skills = async () => {
  const { data } = await getClient().query({ query: GET_ALL_SKILLS });

  return (
    <>
      {data?.allSkills.map((skill: skill) => {
        return (
          <div key={skill.heading}>
            <h3>{skill.heading}</h3>
            {parse(skill.description)}
            <i className={skill.icon.className}></i>
          </div>
        );
      })}
    </>
  );
};
