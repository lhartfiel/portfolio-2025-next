import { render, screen, within } from "@testing-library/react";
import { Experience } from "./Experience";

const headingTitle = "My Experience";
const subheadingTitle =
  "These are skills I have acquired over the last 10 years";
const skillsObj = [
  {
    heading: "Jumping Rope",
    icon: "faCode",
    skillIcon: [{ type: "jumping" }, { type: "roping" }],
  },
  {
    heading: "Pickleball",
    icon: "faListCheck",
    skillIcon: [{ type: "serving" }] as [{ type: string }],
  },
];

describe("Experience component", () => {
  it("should display the h2 heading", () => {
    render(
      <Experience
        heading={headingTitle}
        subheading={subheadingTitle}
        skills={skillsObj}
      />
    );

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      headingTitle
    );
  });

  it("should display the subheading when prop is provided", () => {
    render(
      <Experience
        heading={headingTitle}
        subheading={subheadingTitle}
        skills={skillsObj}
      />
    );

    expect(screen.getByTestId("experience-subhead")).toHaveTextContent(
      subheadingTitle
    );
  });

  it("should not display the subheading when prop is empty", () => {
    render(
      <Experience heading={headingTitle} subheading="" skills={skillsObj} />
    );

    expect(screen.queryByTestId("experience-subhead")).not.toBeInTheDocument();
  });

  it("should display the correct number of skills", () => {
    render(
      <Experience heading={headingTitle} subheading="" skills={skillsObj} />
    );
    const skillWrapper = screen.getAllByTestId("skill-wrapper");
    expect(skillWrapper).toHaveLength(skillsObj.length);
  });

  it("should display all the icons when they match the iconMap", () => {
    render(
      <Experience heading={headingTitle} subheading="" skills={skillsObj} />
    );

    const skillIcons = screen.getAllByTestId("skill-icon");
    expect(skillIcons).toHaveLength(skillsObj.length);
  });

  it("should display only one icon when only one matches the iconMap", () => {
    const updatedSkills = skillsObj.map((skill, idx) => {
      if (idx === 0) {
        return {
          ...skill,
          icon: "faRandom",
        };
      }
      return { ...skill };
    });
    render(
      <Experience heading={headingTitle} subheading="" skills={updatedSkills} />
    );

    const skillIcons = screen.getAllByTestId("skill-icon");
    expect(skillIcons).toHaveLength(1);
    skillIcons.forEach((icon) => {
      expect(icon).toHaveClass("fa-list-check");
    });
  });

  it("should display 3 skills types", () => {
    render(
      <Experience heading={headingTitle} subheading="" skills={skillsObj} />
    );

    const skillTypes = screen.getAllByTestId("skill-type");
    expect(skillTypes).toHaveLength(3);
  });

  it("should display multiple skill types for the second object", () => {
    render(
      <Experience heading={headingTitle} subheading="" skills={skillsObj} />
    );

    const firstSkill = screen.getAllByTestId("skill-wrapper")[0];
    const skillTypes = within(firstSkill).getAllByTestId("skill-type");

    expect(skillTypes).toHaveLength(2);

    const expectedTypes = ["jumping", "roping"];
    skillTypes.forEach((type, idx) => {
      expect(type).toHaveTextContent(expectedTypes[idx]);
    });
  });

  it("should have the hidden class on the last type item", () => {
    render(
      <Experience heading={headingTitle} subheading="" skills={skillsObj} />
    );

    const firstSkill = screen.getAllByTestId("skill-wrapper")[0];
    const dividers = within(firstSkill).queryAllByTestId("type-divider");
    dividers.forEach((divider, idx) => {
      if (idx + 1 === dividers.length) {
        expect(divider).toHaveClass("hidden");
      } else {
        expect(divider).not.toHaveClass("hidden");
      }
    });
  });
});
