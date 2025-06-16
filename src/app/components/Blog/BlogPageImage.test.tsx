import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { BlogPageImage } from "./BlogPageImage";

const blogData = {
  id: 1,
  title: "My rad blog post",
  subtitle: "This blog post is very description",
  image: "uploads/halloween.png",
  createdAt: "July 12, 2024",
  updatedDate: "July 15, 2024",
  content: "In the beginning, there were only handwritten letters.",
  slug: "rad-blog-post",
};

describe("BlogPageImage component", () => {
  it("should show the loader when the image is loading", () => {
    render(<BlogPageImage blog={blogData} />);
    expect(screen.getByTestId("img-loader")).toBeInTheDocument();
    expect(screen.getByTestId("blog-img")).toBeInTheDocument(); //Image exists even when still loading
  });

  it("should display the image when loading is complete", async () => {
    render(<BlogPageImage blog={blogData} />);
    const image = screen.getByTestId("blog-img");

    (global as any).onImageLoadComplete();

    await waitFor(() => {
      expect(screen.queryByTestId("img-loader")).not.toBeInTheDocument();
    });

    expect(image).toBeInTheDocument();
  });

  it("should display the correct alt image text", () => {
    render(<BlogPageImage blog={blogData} />);
    const image = screen.getByTestId("blog-img");
    expect(image).toHaveAttribute("alt", `Photo for ${blogData.title}`);
  });

  it("should display the correct image source", () => {
    render(<BlogPageImage blog={blogData} />);
    const image = screen.getByTestId("blog-img");
    expect(image).toHaveAttribute(
      "src",
      `http://localhost:3000/${blogData.image}`
    );
  });

  it("should display the correct loader styles", () => {
    render(<BlogPageImage blog={blogData} />);
    const loader = screen.getByTestId("img-loader");
    expect(loader).toHaveClass(
      "flex justify-center items-center text-primary color-primary text-6xl"
    );
  });
  it("should still load the app if the image is missing", () => {
    const updatedBlog = { ...blogData, image: "" };
    render(<BlogPageImage blog={updatedBlog} />);
    expect(screen.getByTestId("blog-img")).toBeInTheDocument();
  });
});
