const skillsResponse = {
  data: [
    {
      id: 1,
      heading: "JavaScript",
      description:
        "A high-level, dynamic, untyped, and interpreted programming language.",
      icon: {
        className: "flex",
        type: "ts-javascript",
      },
    },
    {
      id: 2,
      heading: "Python",
      description:
        "An interpreted, high-level, general-purpose programming language.",
      icon: {
        className: "flex",
        type: "ts-python",
      },
    },
    {
      id: 3,
      heading: "UX",
      description:
        "The user experience (UX) is the overall experience a user has when interacting with a product or service.",
      icon: {
        className: "flex",
        type: "ts-ux",
      },
    },
  ],
};

const blogPostsResponse = {
  data: [
    {
      id: 1,
      title: "Blog Post 1",
      subtitle: "Subtitle 1",
      createdAt: "2023-01-01",
      updatedDate: "2023-01-02",
      excerpt: "This is the excerpt for blog post 1.",
      image: "image1.jpg",
      slug: "blog-post-1",
    },
    {
      id: 2,
      title: "Blog Post 2",
      subtitle: "Subtitle 2",
      createdAt: "2023-02-01",
      updatedDate: "2023-02-02",
      excerpt: "This is the excerpt for blog post 2.",
      image: "image2.jpg",
      slug: "blog-post-2",
    },
  ],
};
const singleBlogPostResponse = {
  data: {
    id: 1,
    title: "Blog Post 1",
    subtitle: "Subtitle 1",
    createdAt: "2023-01-01",
    updatedDate: "2023-01-02",
    content: "<p>This is the content for blog post 1.</p>",
    image: "image1.jpg",
    slug: "blog-post-1",
  },
};

export { skillsResponse, blogPostsResponse, singleBlogPostResponse };
