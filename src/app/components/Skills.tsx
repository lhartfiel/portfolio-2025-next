import parse from "html-react-parser";
import { GET_ALL_SKILLS } from "src/app/api/graphql/queries";
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
  let skillsData = [];
  try {
    const { data } = await getClient().query({ query: GET_ALL_SKILLS });
    skillsData = data?.allSkills || [];
  } catch (error) {
    console.error("Error fetching skills data:", error);
    skillsData = [
      {
        heading: "Fallback Skill",
        description: "<p>Data fetch failed.</p>",
        icon: { type: "fallback", className: "fallback-icon" },
      },
    ];
  }

  return (
    <>
      {skillsData.map((skill: skill) => {
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
