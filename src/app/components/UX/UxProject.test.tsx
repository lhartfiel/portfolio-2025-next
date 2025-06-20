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

  it("should not display an image tag if an image is not provided", () => {
    render(<UxProject projects={projectProps} />);
    const projects = screen.getAllByTestId("project");
    const secondProject = projects[1];
    const image = within(secondProject).queryByRole("img");
    expect(image).not.toBeInTheDocument();
  });
});
