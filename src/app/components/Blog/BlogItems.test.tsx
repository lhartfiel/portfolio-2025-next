import { render, screen } from "@testing-library/react";
import { BlogItems } from "./BlogItems";

const blogPost = {
  id: 1,
  title: "Initial Blog Post",
  subtitle: "A subtitle for the blog post",
  image: "uploads/lantern.jpg",
  createdAt: "June 07, 2025",
  excerpt: "An excerpt for the blog post",
  slug: "blog-post",
};

beforeAll(() => {
  process.env.NEXT_PUBLIC_IMAGE_PATH = "http://localhost/";
});

describe("Blog Items", () => {
  it("should render the title", () => {
    render(<BlogItems post={blogPost} idx={1} />);
    const heading = screen.getByRole("heading");
    expect(heading).toHaveTextContent(blogPost.title);
  });

  it("should render the correct alt and src for the Image", () => {
    const host = process.env.NEXT_PUBLIC_IMAGE_PATH;
    render(<BlogItems post={blogPost} idx={1} />);
    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("alt", `Photo for ${blogPost.title}`);
    expect(image).toHaveAttribute("src", `${host}${blogPost.image}`);
  });

  it("should render the date as Mon xx, yyyy", () => {
    render(<BlogItems post={blogPost} idx={1} />);
    const date = screen.getByTestId("blog-date");
    expect(date).toHaveTextContent("Jun 7, 2025");
  });

  it("should render the subtitle, not the excerpt", () => {
    render(<BlogItems post={blogPost} idx={1} />);
    const subtitle = screen.getByTestId("blog-subtitle");
    const excerpt = screen.queryByTestId("blog-excerpt");
    expect(subtitle).toBeInTheDocument();
    expect(excerpt).not.toBeInTheDocument();
  });

  it("should render the excerpt when no subtitle is provided", () => {
    const updatedBlogPost = { ...blogPost, subtitle: "" };
    render(<BlogItems post={updatedBlogPost} idx={1} />);
    const subtitle = screen.queryByTestId("blog-subtitle");
    const excerpt = screen.queryByTestId("blog-excerpt");
    expect(subtitle).not.toBeInTheDocument();
    expect(excerpt).toBeInTheDocument();
  });

  it("should render the button", async () => {
    render(<BlogItems post={blogPost} idx={1} />);
    const button = screen.getByRole("link", { name: /read more/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("href", `/blog/${blogPost.slug}`);
  });

  it("should not render BlogItems if idx is 0", () => {
    const { container } = render(<BlogItems post={blogPost} idx={0} />);
    expect(container).toBeEmptyDOMElement();
  });
});
