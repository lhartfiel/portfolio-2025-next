import { render, screen, within } from "@testing-library/react";
import { UxProject } from "./UxProject";

const projectProps = [
  {
    duration: "4 weeks",
    excerpt: "That time I created something really cool",
    excerptImage: "/uploads/lantern.jpg",
    intro: "In the beginning",
    projectType: "Professional",
    role: "Research and Designer",
    slug: "rad-project",
    title: "My Rad Project",
  },

  {
    duration: "8 weeks",
    excerpt: "An app to travel back in time",
    intro: "Remember the movie Back to the Future with Marty McFly?",
    projectType: "Personal",
    role: "Travel Designer",
    slug: "time-travel-project",
    title: "Time Travel Project",
  },
];

describe("UX Project Component", () => {
  it("should display the h2 heading", () => {
    render(<UxProject projects={projectProps} />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "UX Projects"
    );
  });

  it("should display the correct number of projects", () => {
    render(<UxProject projects={projectProps} />);
    expect(screen.getAllByTestId("project")).toHaveLength(projectProps.length);
  });

  it("should display the number based on the index", () => {
    render(<UxProject projects={projectProps} />);
    const projects = screen.getAllByTestId("number");
    projects.forEach((project, idx) => {
      expect(project).toHaveTextContent((idx + 1).toString());
    });
  });

  it("should display correct Image src", () => {
    const path = process.env.NEXT_PUBLIC_IMAGE_PATH;
    render(<UxProject projects={projectProps} />);
    const firstImage = screen.getAllByRole("img")[0];
    expect(firstImage).toHaveAttribute(
      "src",
      `${path}${projectProps[0].excerptImage}`
    );
  });

  it("should display the correct correct classname based on the index", () => {
    render(<UxProject projects={projectProps} />);
    const imgWrappers = screen.getAllByTestId("img-wrapper");
    imgWrappers.forEach((wrapper, idx) => {
      if (idx + (1 % 2) === 0) {
        expect(wrapper).toHaveClass("md:order-2");
      } else {
        expect(wrapper).toHaveClass("md:order-1");
      }
    });
  });

  it("should not display an image tag if an image is not provided", () => {
    render(<UxProject projects={projectProps} />);
    const projects = screen.getAllByTestId("project");
    const secondProject = projects[1];
    const image = within(secondProject).queryByRole("img");
    expect(image).not.toBeInTheDocument();
  });

  it("should display the correct order classname based on index", () => {
    render(<UxProject projects={projectProps} />);
    const projects = screen.getAllByTestId("project");
    projects.forEach((project, idx) => {
      const contentWrapper = within(project).getByTestId("project-content");
      if (idx === 0) {
        expect(contentWrapper).toHaveClass(
          "flex flex-col justify-start bg-portfolio-gray-light items-start mt-4 md:mt-0 w-full md:w-1/3 p-6 md:order-2"
        );
      } else {
        expect(contentWrapper).toHaveClass(
          "flex flex-col justify-start bg-portfolio-gray-light items-start mt-4 md:mt-0 w-full md:w-1/3 p-6 md:order-1"
        );
      }
    });
  });

  it("should display the project title", () => {
    render(<UxProject projects={projectProps} />);
    const projects = screen.getAllByTestId("project");
    const firstProjectTitle = within(projects[0]).getByRole("heading", {
      level: 3,
    });
    expect(firstProjectTitle).toHaveTextContent(projectProps[0].title);
  });

  it("should display the project excerpt", () => {
    render(<UxProject projects={projectProps} />);
    const projects = screen.getAllByTestId("project");
    projects.forEach((project, idx) => {
      const description = within(project).getByTestId("project-excerpt");
      expect(description).toHaveTextContent(projectProps[idx].excerpt);
    });
  });

  it("should santize and parse the project excerpt", () => {
    const updatedProjectProps = projectProps.map((project, idx) => {
      if (idx === 0) {
        return {
          ...project,
          excerpt:
            "<a></a><script>alert('XSS')</script> This is a test excerpt.",
        };
      } else {
        return project;
      }
    });
    render(<UxProject projects={updatedProjectProps} />);
    const projects = screen.getAllByTestId("project");
    const description = within(projects[0]).getByTestId("project-excerpt");
    expect(description).toHaveTextContent("This is a test excerpt.");
    expect(description).not.toContainHTML("<script>");
  });

  it("should display the correct href link for the button", () => {
    render(<UxProject projects={projectProps} />);
    const projects = screen.getAllByTestId("project");
    projects.forEach((project, idx) => {
      const button = within(project).getByRole("link");
      expect(button).toHaveAttribute("href", `ux/${projectProps[idx].slug}`);
    });
  });
});
