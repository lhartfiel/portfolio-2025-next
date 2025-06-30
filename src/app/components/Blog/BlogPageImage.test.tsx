import { render, screen, waitFor } from "@testing-library/react";
import { BlogPageImage } from "./BlogPageImage";
import { onImageLoadComplete } from "../../../../jest.setup.ts";

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

    if (onImageLoadComplete) {
      onImageLoadComplete(); // Triggers the callback
    }

    await waitFor(() => {
      expect(screen.queryByTestId("img-loader")).not.toBeInTheDocument();
    });

    expect(image).toBeInTheDocument();
  });

  it("should display the correct alt image text", async () => {
    render(<BlogPageImage blog={blogData} />);
    if (onImageLoadComplete) {
      onImageLoadComplete(); // Triggers the callback
    }

    await waitFor(() => {
      const image = screen.getByTestId("blog-img");
      expect(image).toHaveAttribute("alt", `Photo for ${blogData.title}`);
    });
  });

  it("should display the correct image source", async () => {
    render(<BlogPageImage blog={blogData} />);

    await waitFor(() => {
      const image = screen.getByTestId("blog-img");
      expect(image).toHaveAttribute(
        "src",
        `http://localhost:3000/${blogData.image}`
      );
    });
  });

  it("should display the correct loader styles", () => {
    render(<BlogPageImage blog={blogData} />);
    const loader = screen.getByTestId("img-loader");
    expect(loader).toHaveClass(
      "flex justify-center items-center text-primary color-primary text-6xl"
    );
  });

  it("should still not load the image tag if the image is missing", () => {
    const updatedBlog = { ...blogData, image: "" };
    render(<BlogPageImage blog={updatedBlog} />);
    expect(screen.queryByTestId("blog-img")).not.toBeInTheDocument();
  });
});
