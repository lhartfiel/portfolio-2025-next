import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Projects } from "./Projects";

const headingProp = "My Projects";
const projectsProps = [
  {
    order: 1,
    projectDescription:
      "My amazing project description with HTML tags. Jelly-o cheesecake liquorice sweet croissant tiramisu danish. Dessert icing sesame snaps donut croissant. Biscuit lollipop dessert pudding gummi bears. Chocolate biscuit gummies gummi bears carrot cake brownie gummies tart chocolate bar. Bonbon topping toffee apple pie brownie. Chupa chups gummies cake bonbon biscuit pastry lemon drops donut chocolate. Icing tiramisu croissant pudding marshmallow halvah lollipop.",
    projectTitle: "Project One",
    skill: [{ type: "React" }, { type: "JavaScript" }],
  },
  {
    order: 2,
    projectDescription:
      "Launched this site from scratch. Marshmallow brownie muffin wafer bonbon. Gingerbread biscuit topping marshmallow candy canes sugar plum liquorice. Shortbread carrot cake chocolate cake liquorice cupcake powder. Shortbread tiramisu cookie apple pie sweet jelly cheesecake sweet roll chocolate bar. Liquorice jelly-o pie cupcake sugar plum sugar plum. Chocolate bar tiramisu chupa chups halvah tart biscuit cake jelly beans. Cake dragée icing muffin lemon drops pie topping toffee jelly beans.",
    projectTitle: "Project Two",
    skill: [{ type: "Vue" }, { type: "Django" }],
  },
];

describe("Projects component", () => {
  it("should display the h2 heading", () => {
    render(<Projects heading={headingProp} projects={projectsProps} />);
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      headingProp
    );
  });

  it("should display the correct number of projects", () => {
    render(<Projects heading={headingProp} projects={projectsProps} />);
    expect(screen.getAllByTestId("project")).toHaveLength(projectsProps.length);
  });

  it("should display the number next to the project based on the order value", () => {
    render(<Projects heading={headingProp} projects={projectsProps} />);
    const orderNum = screen.getAllByTestId("order-number");
    orderNum.forEach((num, idx) => {
      expect(num).toHaveTextContent(projectsProps[idx].order.toString());
    });
  });

  it("should display the number next to the project based on the index if order value is not provided", () => {
    const updatedProps = projectsProps.map((item) => {
      return {
        ...item,
        order: null,
      };
    });
    render(<Projects heading={headingProp} projects={updatedProps} />);
    const orderNum = screen.getAllByTestId("order-number");
    orderNum.forEach((num, idx) => {
      expect(num).toHaveTextContent((idx + 1).toString());
    });
  });

  it("should display the h3 heading for each project", () => {
    render(<Projects heading={headingProp} projects={projectsProps} />);
    const projects = screen.getAllByTestId("project");
    projects.forEach((project, idx) => {
      const heading = within(project).getByRole("heading", { level: 3 });
      expect(heading).toHaveTextContent(projectsProps[idx].projectTitle);
    });
  });

  it("should display the truncated description when showAllContent is false", () => {
    render(<Projects heading={headingProp} projects={projectsProps} />);
    const projects = screen.getAllByTestId("project");
    projects.forEach((project, idx) => {
      const description = within(project).getByTestId("project-desc");
      expect(description).toHaveTextContent(
        projectsProps[idx].projectDescription.substring(0, 120)
      );
    });
  });

  it("should display 'Read More' button text when showAllContent is false", () => {
    render(<Projects heading={headingProp} projects={projectsProps} />);
    const projects = screen.getAllByTestId("project");
    projects.forEach((project) => {
      const link = within(project).getByRole("link");
      expect(link).toHaveTextContent("Read More");
    });
  });

  it("should display 'Read Less' button text when link is clicked", async () => {
    render(<Projects heading={headingProp} projects={projectsProps} />);
    const projects = screen.getAllByTestId("project");
    for (const project of projects) {
      const link = within(project).getByRole("link");
      expect(link).toHaveTextContent("Read More");
      await userEvent.click(link);
      expect(link).toHaveTextContent("Read Less");
    }
  });

  it("should toggle back to 'Read More' when 'Read Less' is clicked", async () => {
    render(<Projects heading={headingProp} projects={projectsProps} />);
    const project = screen.getAllByTestId("project")[0];
    const link = within(project).getByRole("link", { name: /read more/i });

    await userEvent.click(link);
    expect(link).toHaveTextContent("Read Less");

    await userEvent.click(link);
    expect(link).toHaveTextContent("Read More");
  });

  it("should display all of the description text when link is clicked to Read More", async () => {
    render(<Projects heading={headingProp} projects={projectsProps} />);
    const projects = screen.getAllByTestId("project");
    for (const [idx, project] of projects.entries()) {
      const description = within(project).getByTestId("project-desc");
      const link = within(project).getByRole("link");
      expect(description).toHaveTextContent(
        projectsProps[idx].projectDescription.substring(0, 120)
      );
      await userEvent.click(link);
      expect(description).toHaveTextContent(
        projectsProps[idx].projectDescription
      );
    }
  });

  it("should should properly parse the description text", () => {
    const updatedProps = projectsProps.map((project, idx) => {
      if (idx === 0) {
        return {
          ...project,
          projectDescription:
            "<bold>My amazing project description with HTML tags. Jelly-o cheesecake liquorice sweet</bold>",
        };
      }
      return { ...project };
    });
    render(<Projects heading={headingProp} projects={updatedProps} />);
    const projects = screen.getAllByTestId("project");
    projects.forEach(async (project, idx) => {
      const description = within(project).getByTestId("project-desc");
      if (idx === 0) {
        expect(description).toHaveTextContent(
          "My amazing project description with HTML tags. Jelly-o cheesecake liquorice sweet"
        );
      }
    });
  });

  it("should not display the 'Read More' button if description text is less than 120 characters", () => {
    const updatedProps = projectsProps.map((project, idx) => {
      if (idx === 0) {
        return {
          ...project,
          projectDescription: "My amazing project description.",
        };
      }
      return { ...project };
    });
    render(<Projects heading={headingProp} projects={updatedProps} />);
    const projects = screen.getAllByTestId("project");
    projects.forEach(async (project, idx) => {
      const description = within(project).getByTestId("project-desc");
      const link = within(project).queryByRole("link", { name: /Read More/i });
      if (idx === 0) {
        expect(description).toHaveTextContent(
          updatedProps[idx].projectDescription
        );
        expect(link).not.toBeInTheDocument();
      }
    });
  });

  it("should render all of the correct skills for each project", () => {
    render(<Projects heading={headingProp} projects={projectsProps} />);
    const projects = screen.getAllByTestId("project");
    projects.forEach((project, idx) => {
      const projectSkills = within(project).queryAllByTestId("project-skill");
      expect(projectSkills).toHaveLength(projectsProps[idx].skill.length);
      projectSkills.map((skill, i) => {
        expect(skill).toHaveTextContent(projectsProps[idx].skill[i].type);
      });
    });
  });
});
