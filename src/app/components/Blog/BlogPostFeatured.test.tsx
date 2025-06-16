import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { BlogPostFeatured } from "./BlogPostFeatured";

const blogData = {
  id: 1,
  title: "Halloween Spooks",
  subtitle: "This blog post is very description",
  image: "uploads/halloween.png",
  createdAt: "July 12, 2024",
  excerpt: "A small intro for the ghouls and gobblins.",
  slug: "rad-blog-post",
};

describe("BlogPostFeatured component", () => {
  it("should render the image with the src", () => {
    render(<BlogPostFeatured post={blogData} />);
    const hostname = process.env.NEXT_PUBLIC_IMAGE_PATH;
    expect(screen.getByTestId("feat-img")).toHaveAttribute(
      "src",
      `${hostname}${blogData.image}`
    );
  });

  it("should render the image with the alt text", () => {
    render(<BlogPostFeatured post={blogData} />);
    expect(screen.getByTestId("feat-img")).toHaveAttribute(
      "alt",
      `Photo for ${blogData.title}`
    );
  });

  it("should pass the correct sizes attribute to the image", () => {
    render(<BlogPostFeatured post={blogData} />);
    expect(screen.getByTestId("feat-img")).toHaveAttribute(
      "sizes",
      "(max-width: 1440px) 100vw, 1440px"
    );
  });

  it("should still load the image if the image data is missing", () => {
    const updatedBlog = { ...blogData, image: "" };
    render(<BlogPostFeatured post={updatedBlog} />);
    expect(screen.getByTestId("feat-img")).toBeInTheDocument();
  });

  it("should render the h1 heading", () => {
    render(<BlogPostFeatured post={blogData} />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      blogData.title
    );
  });

  it("should render date in the format MMM D, YYYY", () => {
    render(<BlogPostFeatured post={blogData} />);
    expect(screen.getByTestId("blog-date")).toHaveTextContent("Jul 12, 2024");
  });

  it("should render the excerpt if it exists", () => {
    render(<BlogPostFeatured post={blogData} />);

    expect(screen.getByTestId("blog-excerpt")).toHaveTextContent(
      blogData.excerpt
    );
  });

  it("should not render the excerpt if it doesn't exist", () => {
    const updatedBlog = { ...blogData, excerpt: "" };
    render(<BlogPostFeatured post={updatedBlog} />);
    expect(screen.queryByTestId("blog-excerpt")).not.toBeInTheDocument();
  });

  it("should render parsed HTML in the excerpt", () => {
    const updatedBlog = {
      ...blogData,
      excerpt: "<strong>A halloween excerpt with html</strong>",
    };
    render(<BlogPostFeatured post={updatedBlog} />);
    const excerpt = screen.getByTestId("blog-excerpt");
    expect(excerpt.querySelector("strong")).toBeInTheDocument();
    expect(excerpt).toHaveTextContent(/excerpt with html/);
  });

  it("should render the Read More button with the correct link", () => {
    render(<BlogPostFeatured post={blogData} />);
    expect(screen.getByRole("link")).toHaveTextContent("Read More");
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      `/blog/${blogData.slug}`
    );
  });
});
