import { render, screen, within } from "@testing-library/react";
import { HomeSkills } from "./HomeSkills";

const skillsObj = [
  {
    description: "Development Skills",
    icon: "faLaptopCode",
    iconAlt: "Icon of a laptop",
    link: "/dev",
    subhead: "Let/'s code",
  },
  {
    description: "Design",
    icon: "faPaintBrush",
    iconAlt: "Icon of a artbrush",
    link: "/design",
    subhead: "Research, understand, design",
  },
];

const skillsHeading = "My Professional Skills";

describe("HomeSkills component", () => {
  afterEach(() => {
    jest.resetModules(); // important to reset the module registry between tests
  });

  it("renders nothing if no skills are provided", () => {
    render(
      <HomeSkills skills={[]} skillsHeading={skillsHeading} isMdUp={false} />
    );
    expect(screen.queryByTestId("skill")).not.toBeInTheDocument();
  });

  it("should display the h2 heading", () => {
    render(
      <HomeSkills
        skills={skillsObj}
        skillsHeading={skillsHeading}
        isMdUp={false}
      />
    );
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      skillsHeading
    );
  });

  it("should display 2 skills", () => {
    render(
      <HomeSkills
        skills={skillsObj}
        skillsHeading={skillsHeading}
        isMdUp={false}
      />
    );
    expect(screen.getAllByTestId("skill")).toHaveLength(skillsObj.length);
  });

  it("should display the laptop icon for the development skill", () => {
    render(
      <HomeSkills
        skills={skillsObj}
        skillsHeading={skillsHeading}
        isMdUp={false}
      />
    );
    const skillIcons = screen.queryAllByTestId("skill-icon");
    expect(skillIcons).toHaveLength(1);
    skillIcons.forEach((icon) => {
      const svgAttr = icon.querySelector("svg");
      expect(svgAttr?.getAttribute("data-icon")).toMatch(/laptop/);
    });
  });

  it("should not display the artbrush icon for design skill", () => {
    render(
      <HomeSkills
        skills={skillsObj}
        skillsHeading={skillsHeading}
        isMdUp={false}
      />
    );
    const skillIcons = screen.queryAllByTestId("skill-icon");
    expect(skillIcons).toHaveLength(1);
    skillIcons.forEach((icon) => {
      const svgAttr = icon.querySelector("svg");
      expect(svgAttr?.getAttribute("data-icon")).not.toMatch(/brush/);
    });
  });

  it("should display the h3 subheading", () => {
    render(
      <HomeSkills
        skills={skillsObj}
        skillsHeading={skillsHeading}
        isMdUp={false}
      />
    );
    const skillValues = screen.getAllByTestId("skill");

    skillValues.forEach((skill, idx) => {
      const heading = within(skill).getByRole("heading", { level: 3 });
      expect(heading).toHaveTextContent(skillsObj[idx].subhead);
    });
  });

  it("should display the description text", () => {
    render(
      <HomeSkills
        skills={skillsObj}
        skillsHeading={skillsHeading}
        isMdUp={false}
      />
    );
    const skillValues = screen.getAllByTestId("skill");

    skillValues.forEach((skill, idx) => {
      const description = within(skill).getByTestId("description");
      expect(description).toHaveTextContent(skillsObj[idx].description);
    });
  });

  it("should parse the description text", () => {
    const updatedSkills = skillsObj.map((skill) => {
      return {
        ...skill,
        description: "<bold>My updated description</bold>",
      };
    });
    render(
      <HomeSkills
        skills={updatedSkills}
        skillsHeading={skillsHeading}
        isMdUp={false}
      />
    );

    const allSkills = screen.getAllByTestId("skill");
    const description = within(allSkills[0]).queryByTestId("description");
    expect(description).toHaveTextContent("My updated description");
  });

  it("should parse AND sanitize the description text", () => {
    const updatedSkills = skillsObj.map((skill) => {
      return {
        ...skill,
        description: "<img src=x onerror=alert('hi') />",
      };
    });
    render(
      <HomeSkills
        skills={updatedSkills}
        skillsHeading={skillsHeading}
        isMdUp={false}
      />
    );

    const allSkills = screen.getAllByTestId("skill");
    const description = within(allSkills[0]).queryByTestId("description");
    const img = description?.querySelector("img");
    expect(img).toHaveAttribute("src", "x");
    expect(img).not.toHaveAttribute("onerror");
  });

  it("should not display the button with a large width when screen is smaller than md", async () => {
    render(
      <HomeSkills
        skills={skillsObj}
        skillsHeading={skillsHeading}
        isMdUp={false}
      />
    );

    const buttons = screen.getAllByRole("link");
    expect(buttons[0].querySelector("p")).toHaveTextContent("Learn More");
    buttons.forEach((btn) => {
      const nestedBtn = btn.querySelector("p");
      expect(nestedBtn).not.toHaveClass("w-[230px]");
    });
  });

  it("should display the button with a large width when screen is md or up", async () => {
    render(
      <HomeSkills
        skills={skillsObj}
        skillsHeading={skillsHeading}
        isMdUp={true}
      />
    );
    const buttons = screen.getAllByRole("link");
    buttons.forEach((btn) => {
      const nestedBtn = btn.querySelector("p");
      expect(nestedBtn).toHaveClass("w-[230px]");
    });
  });

  it("should display the correct link attribute", () => {
    render(
      <HomeSkills
        skills={skillsObj}
        skillsHeading={skillsHeading}
        isMdUp={true}
      />
    );
    const buttons = screen.getAllByRole("link");
    buttons.forEach((btn, idx) => {
      expect(btn).toHaveAttribute("href", skillsObj[idx].link);
    });
  });
});
