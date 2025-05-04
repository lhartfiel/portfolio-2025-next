import { getClient } from "../ApolloClient";
import parse from "html-react-parser";
import { GET_ALL_SKILLS } from "../apis/schema";

type skill = {
  heading: "string";
  description: "string";
  icon: {
    type: "string";
    className: "string";
  };
};

const Home = async () => {
  const { data } = await getClient().query({ query: GET_ALL_SKILLS });
  console.log("data", data);
  console.log("test", parse(data.allSkills[0].description));
  return (
    <>
      <h1>Home</h1>
      <h2>Skills</h2>
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

export default Home;
